'use client';

import { CourseBuilder } from '@/components/course-builder/course-builder';
import { Card, CardHeader } from '@/components/ui/card';
import {
  Chapter,
  ChapterPositionUpdate,
  LessonPositionUpdate,
} from '@/lib/types';
import { usePathname } from 'next/navigation';
import AddChapter from './AddCourse';
interface MainStructureProps {
  courseId: string;
  initialData: Chapter[];
}
export default function MainStructure({
  courseId,
  initialData,
}: MainStructureProps) {
  const COURSE_ID = usePathname().split('/')[3];
  function handleReorderChapters(
    courseId: string,
    chapters: ChapterPositionUpdate[],
  ) {
    console.log('Change Chapter');
  }

  function handleReorderLessons(
    chapterId: string,
    lessons: LessonPositionUpdate[],
  ) {}

  return (
    <Card className="">
      <CardHeader className="border-b flex items-center justify-between">
        <div className="flex flex-col gap-1 ">
          <h1 className="mb-1 text-xl font-semibold ">Course structure</h1>

          <p className="text-sm text-muted-foreground">
            Drag-and-drop chapters and lessons to reorder them, or drag a lesson
            into a different chapter
          </p>
        </div>

        <AddChapter />
      </CardHeader>
      <CourseBuilder
        courseId={COURSE_ID}
        data={initialData}
        onReorderChapters={handleReorderChapters}
        onReorderLessons={handleReorderLessons}
      />
    </Card>
  );
}
