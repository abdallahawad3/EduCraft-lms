"use server";

import prisma from '@/lib/db';
import { revalidatePath } from 'next/cache';

export const addLessonToChapter = async (
  chapterId: string,
  lessonTitle: string,
) => {
  try {
    if (!lessonTitle || lessonTitle.trim() === '') {
      return {
        message: 'Lesson title is required',
        status: 'error',
      };
    }

    const lastLesson = await prisma.lesson.findFirst({
      where: {
        chapterId,
      },
      orderBy: {
        position: 'desc',
      },
    });

    const nextPosition = (lastLesson?.position ?? 0) + 1;

    const lesson = await prisma.lesson.create({
      data: {
        title: lessonTitle,
        chapterId,
        position: nextPosition,
      },
    });

    revalidatePath(`/admin/courses/${chapterId}/edit`);
    return {
      message: 'Lesson added successfully',
      status: 'success',
      data: lesson,
    };
  } catch (error) {
    console.log(error);
    return {
      message: 'Something went wrong',
      status: 'error',
    };
  }
};

export const deleteLesson = async (lessonId: string) => {
  try {
    await prisma.lesson.delete({
      where: {
        id: lessonId,
      },
    });

    revalidatePath(`/admin/courses/${lessonId}/edit`);
    return {
      message: 'Lesson deleted successfully',
      status: 'success',
    };
  } catch (error) {
    console.log(error);
    return {
      message: 'Something went wrong',
      status: 'error',
    };
  }
};
