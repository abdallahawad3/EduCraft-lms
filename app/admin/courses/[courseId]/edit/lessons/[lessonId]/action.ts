'use server';

import prisma from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { notFound } from 'next/navigation';

type UpdateLessonProps = {
  courseId: string;
  lessonId: string;
  title: string;
  description?: string;
  thumbnailKey?: string;
  videoKey?: string;
};

export async function updateLesson({
  courseId,
  lessonId,
  title,
  description,
  thumbnailKey,
  videoKey,
}: UpdateLessonProps) {
  const lesson = await prisma.lesson.findFirst({
    where: {
      id: lessonId,
      chapter: {
        courseId,
      },
    },
    select: {
      id: true,
    },
  });

  if (!lesson) {
    notFound();
  }

  await prisma.lesson.update({
    where: {
      id: lessonId,
    },
    data: {
      title,
      description,
      thumbnailKey,
      videoKey,
    },
  });

  revalidatePath(`/admin/courses/${courseId}/edit`);
  return {
    success: true,
  };
}
