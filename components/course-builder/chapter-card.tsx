'use client';

import { useSortable } from '@dnd-kit/react/sortable';
import { ChevronDown, GripVertical, Layers } from 'lucide-react';
import { useState } from 'react';

import { Chapter } from '@/lib/types';
import { CHAPTERS_GROUP, ITEM_TYPE } from '../../hooks/use-course-builder';
import { cn } from '../../lib/utils';
import { LessonRow } from './lesson-row';

export interface ChapterCardProps {
  chapter: Chapter;
  index: number;
}

export function ChapterCard({ chapter, index }: ChapterCardProps) {
  const [collapsed, setCollapsed] = useState(false);

  const { ref, handleRef, isDragging, isDropTarget } = useSortable({
    id: chapter.id,
    index,
    type: ITEM_TYPE.CHAPTER,
    accept: ITEM_TYPE.CHAPTER,
    group: CHAPTERS_GROUP,
  });

  return (
    <li
      ref={ref}
      className={cn(
        'rounded-lg border bg-card shadow-sm transition-all',
        isDragging && 'opacity-50 shadow-none',
        isDropTarget && 'ring-2 ring-primary/50',
      )}
    >
      <div className="flex items-center gap-2 px-3 py-3">
        <button
          ref={handleRef}
          type="button"
          aria-label={`Reorder chapter: ${chapter.title}`}
          className={cn(
            'flex h-7 w-7 shrink-0 cursor-grab items-center justify-center rounded text-muted-foreground',
            'hover:bg-muted active:cursor-grabbing',
            isDragging && 'cursor-grabbing',
          )}
        >
          <GripVertical className="h-4 w-4" />
        </button>

        <Layers className="h-4 w-4 shrink-0 text-muted-foreground" />

        <span className="flex-1 truncate font-medium text-foreground">
          {chapter.title}
        </span>

        <span className="shrink-0 rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
          {chapter.lessons.length}{' '}
          {chapter.lessons.length === 1 ? 'lesson' : 'lessons'}
        </span>

        <button
          type="button"
          onClick={() => setCollapsed((v) => !v)}
          aria-label={collapsed ? 'Expand chapter' : 'Collapse chapter'}
          aria-expanded={!collapsed}
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded text-muted-foreground hover:bg-muted"
        >
          <ChevronDown
            className={cn(
              'h-4 w-4 transition-transform',
              collapsed && '-rotate-90',
            )}
          />
        </button>
      </div>

      {!collapsed && (
        <ul className="flex flex-col gap-1 border-t py-2 pl-1">
          {chapter.lessons.length === 0 ? (
            <div></div>
          ) : (
            chapter.lessons.map((lesson, lessonIndex) => (
              <LessonRow
                key={lesson.id}
                lesson={lesson}
                index={lessonIndex}
                chapterId={chapter.id}
              />
            ))
          )}
        </ul>
      )}
    </li>
  );
}
