import prisma from '@/lib/db';
import { notFound } from 'next/navigation';

export const getAdminLesson = async (courseId: string, lessonId: string) => {
  const lesson = await prisma.lesson.findFirst({
    where: {
      id: lessonId,
      chapter: {
        courseId: courseId,
      },
    },
    select: {
      title: true,
      description: true,
      thumbnailKey: true,
      videoKey: true,
      chapterId: true,
    },
  });

  if (!lesson) {
    notFound();
  }

  return lesson;
};

export type AdminLesson = Awaited<ReturnType<typeof getAdminLesson>>;
