'use client';

import { DragDropProvider } from '@dnd-kit/react';

import { Chapter } from '@/lib/types';
import {
  useCourseBuilder,
  type UseCourseBuilderOptions,
} from '../../hooks/use-course-builder';
import { ChapterCard } from './chapter-card';

export interface CourseBuilderProps extends UseCourseBuilderOptions {
  courseId: string;
  data: Chapter[];
  className?: string;
}

export function CourseBuilder({
  courseId,
  data,
  onReorderChapters,
  onReorderLessons,
  className,
}: CourseBuilderProps) {
  const { chapters, handleDragEnd } = useCourseBuilder(courseId, data, {
    onReorderChapters,
    onReorderLessons,
  });

  return (
    <DragDropProvider onDragEnd={handleDragEnd}>
      <ol className={className ?? 'flex flex-col gap-3'}>
        {chapters.map((chapter, index) => (
          <ChapterCard key={chapter.id} chapter={chapter} index={index} />
        ))}
      </ol>
    </DragDropProvider>
  );
}
