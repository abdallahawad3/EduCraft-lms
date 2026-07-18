'use server';

import prisma from '@/lib/db';
import { revalidatePath } from 'next/cache';

export async function updateChapterPositions(
  courseId: string,
  chapters: {
    id: string;
    position: number;
  }[],
) {
  await prisma.$transaction(
    chapters.map((chapter) =>
      prisma.chapter.update({
        where: {
          id: chapter.id,
        },
        data: {
          position: chapter.position,
        },
      }),
    ),
  );
  revalidatePath(`/admin/courses/${courseId}/edit`);
  return {
    success: true,
  };
}

export async function updateLessonPositions(
  chapterId: string,
  lessons: {
    id: string;
    position: number;
  }[],
) {
  await prisma.$transaction(
    lessons.map((lesson) =>
      prisma.lesson.update({
        where: {
          id: lesson.id,
        },
        data: {
          position: lesson.position,
        },
      }),
    ),
  );
  revalidatePath(`/admin/courses/${chapterId}/edit`);
  return {
    success: true,
  };
}
