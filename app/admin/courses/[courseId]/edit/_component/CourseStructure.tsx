'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import {
  BookOpen,
  ChevronDown,
  ChevronRight,
  FolderPlus,
  GripVertical,
  Plus,
  Trash2,
} from 'lucide-react';
import { DragEvent, useRef, useState } from 'react';

interface Lesson {
  id: string;
  title: string;
}

interface Section {
  id: string;
  title: string;
  collapsed: boolean;
  lessons: Lesson[];
}

type DragState =
  | { kind: 'section'; sectionId: string }
  | { kind: 'lesson'; sectionId: string; lessonId: string }
  | null;

type DropPosition = 'before' | 'after';

type OverState =
  | { kind: 'section'; id: string; position: DropPosition }
  | {
      kind: 'lesson';
      sectionId: string;
      id: string | '__end__';
      position: DropPosition;
    }
  | null;

const initialSections: Section[] = [
  {
    id: 'sec-1',
    title: 'Introduction',
    collapsed: true,
    lessons: [
      { id: 'les-1', title: 'Welcome to the course' },
      { id: 'les-2', title: 'How this course works' },
      { id: 'les-3', title: 'Meet your instructor' },
    ],
  },
  {
    id: 'sec-2',
    title: 'Getting Started',
    collapsed: true,
    lessons: [
      { id: 'les-4', title: 'Setting up your environment' },
      { id: 'les-5', title: 'Your first project' },
    ],
  },
  {
    id: 'sec-3',
    title: 'Advanced Topics',
    collapsed: true,
    lessons: [{ id: 'les-6', title: 'Performance optimization' }],
  },
];

let idCounter = 100;
const nextId = (prefix: string) => `${prefix}-${idCounter++}`;

export default function CourseBuilder() {
  const [sections, setSections] = useState<Section[]>(initialSections);

  const [drag, setDrag] = useState<DragState>(null);
  const [over, setOver] = useState<OverState>(null);

  const dragRef = useRef<DragState>(null);
  const setDragBoth = (val: DragState) => {
    dragRef.current = val;
    setDrag(val);
  };

  const clearDrag = () => {
    dragRef.current = null;
    setDrag(null);
    setOver(null);
  };

  const addSection = () => {
    setSections((prev) => [
      ...prev,
      {
        id: nextId('sec'),
        title: 'New section',
        collapsed: false,
        lessons: [],
      },
    ]);
  };

  const removeSection = (sectionId: string) => {
    setSections((prev) => prev.filter((s) => s.id !== sectionId));
  };

  const renameSection = (sectionId: string, title: string) => {
    setSections((prev) =>
      prev.map((s) => (s.id === sectionId ? { ...s, title } : s)),
    );
  };

  const toggleCollapsed = (sectionId: string) => {
    setSections((prev) =>
      prev.map((s) =>
        s.id === sectionId ? { ...s, collapsed: !s.collapsed } : s,
      ),
    );
  };

  const addLesson = (sectionId: string) => {
    setSections((prev) =>
      prev.map((s) =>
        s.id === sectionId
          ? {
              ...s,
              lessons: [
                ...s.lessons,
                { id: nextId('les'), title: 'New lesson' },
              ],
            }
          : s,
      ),
    );
  };

  const removeLesson = (sectionId: string, lessonId: string) => {
    setSections((prev) =>
      prev.map((s) =>
        s.id === sectionId
          ? { ...s, lessons: s.lessons.filter((l) => l.id !== lessonId) }
          : s,
      ),
    );
  };

  const renameLesson = (sectionId: string, lessonId: string, title: string) => {
    setSections((prev) =>
      prev.map((s) =>
        s.id === sectionId
          ? {
              ...s,
              lessons: s.lessons.map((l) =>
                l.id === lessonId ? { ...l, title } : l,
              ),
            }
          : s,
      ),
    );
  };

  const onSectionDragStart = (
    e: DragEvent<HTMLDivElement>,
    sectionId: string,
  ) => {
    e.dataTransfer.effectAllowed = 'move';
    setDragBoth({ kind: 'section', sectionId });
  };

  const onSectionDragOver = (
    e: DragEvent<HTMLDivElement>,
    sectionId: string,
  ) => {
    if (dragRef.current?.kind !== 'section') return;
    e.preventDefault();
    e.stopPropagation();
    const rect = e.currentTarget.getBoundingClientRect();
    const position =
      e.clientY < rect.top + rect.height / 2 ? 'before' : 'after';
    setOver({ kind: 'section', id: sectionId, position });
  };

  const onSectionDrop = (
    e: DragEvent<HTMLDivElement>,
    targetSectionId: string,
  ) => {
    if (dragRef.current?.kind !== 'section') return;
    e.preventDefault();
    e.stopPropagation();
    const { sectionId: sourceId } = dragRef.current;
    const position = over?.position ?? 'before';

    setSections((prev) => {
      const next = [...prev];
      const fromIdx = next.findIndex((s) => s.id === sourceId);
      if (fromIdx === -1) return prev;
      const [moved] = next.splice(fromIdx, 1);

      let toIdx = next.findIndex((s) => s.id === targetSectionId);
      if (toIdx === -1) toIdx = next.length;
      if (position === 'after') toIdx += 1;

      next.splice(toIdx, 0, moved);
      return next;
    });
    clearDrag();
  };

  // ---- Drag: lessons (including across sections) ---------------------------
  const onLessonDragStart = (
    e: DragEvent<HTMLDivElement>,
    sectionId: string,
    lessonId: string,
  ) => {
    e.stopPropagation();
    e.dataTransfer.effectAllowed = 'move';
    setDragBoth({ kind: 'lesson', sectionId, lessonId });
  };

  const onLessonDragOver = (
    e: DragEvent<HTMLDivElement>,
    sectionId: string,
    lessonId: string,
  ) => {
    if (dragRef.current?.kind !== 'lesson') return;
    e.preventDefault();
    e.stopPropagation();
    const rect = e.currentTarget.getBoundingClientRect();
    const position =
      e.clientY < rect.top + rect.height / 2 ? 'before' : 'after';
    setOver({ kind: 'lesson', sectionId, id: lessonId, position });
  };

  // Hovering the lesson-list container itself (empty space / below last item)
  const onLessonListDragOver = (
    e: DragEvent<HTMLDivElement>,
    sectionId: string,
  ) => {
    if (dragRef.current?.kind !== 'lesson') return;
    e.preventDefault();
    e.stopPropagation();
    setOver({ kind: 'lesson', sectionId, id: '__end__', position: 'after' });
  };

  const commitLessonDrop = (
    e: DragEvent<HTMLDivElement>,
    targetSectionId: string,
    targetLessonId: string,
  ) => {
    if (dragRef.current?.kind !== 'lesson') return;
    e.preventDefault();
    e.stopPropagation();
    const { sectionId: sourceSectionId, lessonId: sourceLessonId } =
      dragRef.current;
    const position = over?.position ?? 'after';

    setSections((prev) => {
      const next = prev.map((s) => ({ ...s, lessons: [...s.lessons] }));

      const srcSectionIdx = next.findIndex((s) => s.id === sourceSectionId);
      if (srcSectionIdx === -1) return prev;
      const srcLessonIdx = next[srcSectionIdx].lessons.findIndex(
        (l) => l.id === sourceLessonId,
      );
      if (srcLessonIdx === -1) return prev;
      const [moved] = next[srcSectionIdx].lessons.splice(srcLessonIdx, 1);

      const dstSectionIdx = next.findIndex((s) => s.id === targetSectionId);
      if (dstSectionIdx === -1) return prev;
      const dstLessons = next[dstSectionIdx].lessons;

      let insertIdx;
      if (!targetLessonId || targetLessonId === '__end__') {
        insertIdx = dstLessons.length;
      } else {
        insertIdx = dstLessons.findIndex((l) => l.id === targetLessonId);
        if (insertIdx === -1) insertIdx = dstLessons.length;
        else if (position === 'after') insertIdx += 1;
      }

      dstLessons.splice(insertIdx, 0, moved);
      return next;
    });
    clearDrag();
  };

  const onLessonDrop = (
    e: DragEvent<HTMLDivElement>,
    sectionId: string,
    lessonId: string,
  ) => commitLessonDrop(e, sectionId, lessonId);
  const onLessonListDrop = (e: DragEvent<HTMLDivElement>, sectionId: string) =>
    commitLessonDrop(e, sectionId, '__end__');

  // --- ------------------------------------------------------------------
  function onSubmit() {
    console.log(sections);
  }
  return (
    <div>
      <Card className="py-0">
        <CardHeader className="flex items-center gap-2 py-6! mb-4 border-b">
          <div className="flex items-center gap-1">
            <BookOpen className="w-5 h-5" />
            <h1 className="text-lg font-semibold ">Course structure</h1>
          </div>
          <span className="text-xs ml-auto">
            Drag <GripVertical className="inline w-3 h-3 -mt-0.5" /> handles to
            reorder
          </span>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-3">
            {sections.map((section) => {
              const isDraggingThisSection =
                drag?.kind === 'section' && drag.sectionId === section.id;
              const showBeforeLine =
                over?.kind === 'section' &&
                over.id === section.id &&
                over.position === 'before';
              const showAfterLine =
                over?.kind === 'section' &&
                over.id === section.id &&
                over.position === 'after';

              return (
                <div key={section.id}>
                  {showBeforeLine && (
                    <div className="h-0.5 rounded-full mb-1" />
                  )}

                  <div
                    className={`border rounded-xl shadow-sm transition-opacity ${
                      isDraggingThisSection ? 'opacity-40' : 'opacity-100'
                    } ${
                      over?.kind === 'section' && over.id === section.id
                        ? 'border-primary'
                        : 'border'
                    }`}
                    onDragOver={(e) => onSectionDragOver(e, section.id)}
                    onDrop={(e) => onSectionDrop(e, section.id)}
                  >
                    {/* Section header */}
                    <div
                      className={cn(
                        `flex items-center gap-2 px-3 cursor-grab active:cursor-grabbing border-b py-5`,
                        section.collapsed ? '' : 'mb-4',
                      )}
                      draggable
                      onDragStart={(e) => onSectionDragStart(e, section.id)}
                      onDragEnd={clearDrag}
                    >
                      <GripVertical className="w-4 h-4 shrink-0" />

                      <Button
                        size={'icon'}
                        variant={'ghost'}
                        type="button"
                        onClick={() => toggleCollapsed(section.id)}
                        className="shrink-0"
                        aria-label={
                          section.collapsed
                            ? 'Expand section'
                            : 'Collapse section'
                        }
                      >
                        {section.collapsed ? (
                          <ChevronRight className="w-4 h-4" />
                        ) : (
                          <ChevronDown className="w-4 h-4" />
                        )}
                      </Button>

                      <Input
                        value={section.title}
                        onChange={(e) =>
                          renameSection(section.id, e.target.value)
                        }
                        className="flex-1 text-sm bg-transparent! outline-none! rounded px-1 border-none! focus-visible:border-none! focus-visible:ring-0! -mx-1"
                      />

                      <span className="text-xs shrink-0">
                        {section.lessons.length} lesson
                        {section.lessons.length !== 1 ? 's' : ''}
                      </span>

                      <Button
                        size={'icon-lg'}
                        variant={'outline'}
                        type="button"
                        onClick={() => removeSection(section.id)}
                        className=" shrink-0 p-1"
                        aria-label="Delete section"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>

                    {/* Lessons */}
                    {!section.collapsed && (
                      <div
                        className="px-3 pb-3 pl-9 flex flex-col gap-1.5 min-h-[8px]"
                        onDragOver={(e) => onLessonListDragOver(e, section.id)}
                        onDrop={(e) => onLessonListDrop(e, section.id)}
                      >
                        {section.lessons.map((lesson) => {
                          const isDraggingThisLesson =
                            drag?.kind === 'lesson' &&
                            drag.lessonId === lesson.id;
                          const lessonShowBefore =
                            over?.kind === 'lesson' &&
                            over.sectionId === section.id &&
                            over.id === lesson.id &&
                            over.position === 'before';
                          const lessonShowAfter =
                            over?.kind === 'lesson' &&
                            over.sectionId === section.id &&
                            over.id === lesson.id &&
                            over.position === 'after';

                          return (
                            <div key={lesson.id}>
                              {lessonShowBefore && (
                                <div className="h-0.5  rounded-full mb-1" />
                              )}
                              <div
                                className={`flex items-center gap-2 px-2 py-1.5 rounded-lg border cursor-grab active:cursor-grabbing transition-opacity ${
                                  isDraggingThisLesson
                                    ? 'opacity-40'
                                    : 'opacity-100  '
                                }`}
                                draggable
                                onDragStart={(e) =>
                                  onLessonDragStart(e, section.id, lesson.id)
                                }
                                onDragOver={(e) =>
                                  onLessonDragOver(e, section.id, lesson.id)
                                }
                                onDrop={(e) =>
                                  onLessonDrop(e, section.id, lesson.id)
                                }
                                onDragEnd={clearDrag}
                              >
                                <GripVertical className="w-3.5 h-3.5 shrink-0" />
                                <Input
                                  value={lesson.title}
                                  onChange={(e) =>
                                    renameLesson(
                                      section.id,
                                      lesson.id,
                                      e.target.value,
                                    )
                                  }
                                  className="flex-1 text-sm bg-transparent! outline-none! rounded px-1 border-none! focus-visible:border-none! focus-visible:ring-0! -mx-1"
                                />
                                <Button
                                  type="button"
                                  size={'icon'}
                                  variant={'outline'}
                                  onClick={() =>
                                    removeLesson(section.id, lesson.id)
                                  }
                                  className=" shrink-0 p-0.5"
                                  aria-label="Delete lesson"
                                >
                                  <Trash2 className="size-4 text-destructive" />
                                </Button>
                              </div>
                              {lessonShowAfter && (
                                <div className="h-0.5 bg-indigo-400 rounded-full mt-1" />
                              )}
                            </div>
                          );
                        })}

                        {over?.kind === 'lesson' &&
                          over.sectionId === section.id &&
                          over.id === '__end__' && (
                            <div className="h-0.5 rounded-full" />
                          )}

                        <Button
                          type="button"
                          onClick={() => addLesson(section.id)}
                          variant={'secondary'}
                          className="flex items-center gap-1.5 text-xs mt-1 w-fit px-5"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          Add lesson
                        </Button>
                      </div>
                    )}
                  </div>

                  {showAfterLine && (
                    <div className="h-0.5 bg-indigo-500 rounded-full mt-1" />
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <Button
        type="button"
        onClick={addSection}
        className="flex items-center gap-1.5 text-sm  mt-4 rounded-xl w-full justify-center "
      >
        <FolderPlus className="w-4 h-4" />
        Add section
      </Button>

      <Button onClick={onSubmit} type="submit">
        Submit
      </Button>
    </div>
  );
}
