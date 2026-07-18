/* eslint-disable react-hooks/set-state-in-effect */
'use client';

import {
  Chapter,
  ChapterPositionUpdate,
  CourseData,
  Lesson,
  LessonPositionUpdate,
} from '@/lib/types';
import { move } from '@dnd-kit/helpers';
import { DragDropProvider } from '@dnd-kit/react';
import { isSortable } from '@dnd-kit/react/sortable';
import type { ComponentProps } from 'react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

export const CHAPTERS_GROUP = 'chapters' as const;

export const ITEM_TYPE = {
  CHAPTER: 'chapter',
  LESSON: 'lesson',
} as const;

type LessonsByChapter = Record<string, Lesson[]>;

function toLessonsByChapter(chapters: Chapter[]): LessonsByChapter {
  return Object.fromEntries(
    (chapters ?? []).map((chapter) => [chapter.id, chapter.lessons ?? []]),
  );
}

type OnDragEndEvent = Parameters<
  NonNullable<ComponentProps<typeof DragDropProvider>['onDragEnd']>
>[0];

export interface UseCourseBuilderOptions {
  onReorderChapters?: (
    courseId: string,
    chapters: ChapterPositionUpdate[],
  ) => void;

  onReorderLessons?: (
    chapterId: string,
    lessons: LessonPositionUpdate[],
  ) => void;
}

export interface UseCourseBuilderResult {
  chapters: Chapter[];
  handleDragEnd: (event: OnDragEndEvent) => void;
  setCourseData: (data: CourseData) => void;
}

export function useCourseBuilder(
  courseId: string,
  initial: Chapter[],
  { onReorderChapters, onReorderLessons }: UseCourseBuilderOptions = {},
): UseCourseBuilderResult {
  const [chapterOrder, setChapterOrder] = useState<Chapter[]>([]);
  const [lessonsByChapter, setLessonsByChapter] = useState<LessonsByChapter>(
    {},
  );

  // Sync server data when it arrives
  useEffect(() => {
    setChapterOrder(initial ?? []);
    setLessonsByChapter(toLessonsByChapter(initial ?? []));
  }, [initial]);

  const handleDragEnd = useCallback((event: OnDragEndEvent) => {
    if (event.canceled) return;

    const { source } = event.operation;

    if (!isSortable(source)) return;

    // Moving chapters
    if (source.type === ITEM_TYPE.CHAPTER) {
      setChapterOrder((chapters) => move(chapters, event));

      return;
    }

    // Moving lessons
    if (source.type === ITEM_TYPE.LESSON) {
      setLessonsByChapter((lessons) => move(lessons, event));
    }
  }, []);

  const setCourseData = useCallback((data: CourseData) => {
    setChapterOrder(data.chapters);
    setLessonsByChapter(toLessonsByChapter(data.chapters));
  }, []);

  const chapters = useMemo<Chapter[]>(() => {
    return chapterOrder.map((chapter, chapterIndex) => ({
      ...chapter,

      courseId,

      position: chapterIndex + 1,

      lessons: (lessonsByChapter[chapter.id] ?? []).map(
        (lesson, lessonIndex) => ({
          ...lesson,

          chapterId: chapter.id,

          position: lessonIndex + 1,
        }),
      ),
    }));
  }, [chapterOrder, lessonsByChapter, courseId]);

  /**
   * Update chapter positions
   */

  const previousChapterOrder = useRef('');

  useEffect(() => {
    const currentOrder = chapters.map((chapter) => chapter.id).join(',');

    // first render
    if (!previousChapterOrder.current) {
      previousChapterOrder.current = currentOrder;
      return;
    }

    // nothing changed
    if (previousChapterOrder.current === currentOrder) {
      return;
    }

    previousChapterOrder.current = currentOrder;

    onReorderChapters?.(
      courseId,
      chapters.map(({ id, position }) => ({
        id,
        position,
      })),
    );
  }, [chapters, courseId, onReorderChapters]);

  /**
   * Update lesson positions
   */

  const previousLessonOrders = useRef<Record<string, string>>({});

  useEffect(() => {
    for (const chapter of chapters) {
      const currentOrder = chapter.lessons.map((lesson) => lesson.id).join(',');

      const previousOrder = previousLessonOrders.current[chapter.id];

      // save first state
      if (!previousOrder) {
        previousLessonOrders.current[chapter.id] = currentOrder;

        continue;
      }

      // no change
      if (previousOrder === currentOrder) {
        continue;
      }

      previousLessonOrders.current[chapter.id] = currentOrder;

      onReorderLessons?.(
        chapter.id,

        chapter.lessons.map(({ id, position, chapterId }) => ({
          id,
          position,
          chapterId,
        })),
      );
    }
  }, [chapters, onReorderLessons]);

  return {
    chapters,
    handleDragEnd,
    setCourseData,
  };
}
