'use server';
import { requiredAdmin } from '@/app/data/admin/required-admin';
import prisma from '@/lib/db';
import { ApiResponse } from '@/lib/types';
import {
  ADD_CHAPTER_SCHEMA,
  AddChapterSchemaType,
} from '@/lib/validation/add-chapter';
import {
  CourseSchemeType,
  CREATE_COURSE_SCHEME,
} from '@/lib/validation/create-course';
import { revalidatePath } from 'next/cache';

export async function updateCourse(
  data: CourseSchemeType,
  courseId: string,
): Promise<ApiResponse> {
  const session = await requiredAdmin();
  try {
    const validation = CREATE_COURSE_SCHEME.safeParse(data);
    if (!validation.success) {
      return {
        message: 'Enter valid data',
        status: 'error',
      };
    }

    const course = await prisma.course.update({
      data: {
        category: validation.data.category,
        description: validation.data.description,
        fileKey: validation.data.fileKey,
        duration: Number(validation.data.duration),
        price: Number(validation.data.price),
        title: validation.data.title,
        level: validation.data.level,
        slug: validation.data.slug,
        smallDescription: validation.data.smallDescription,
        status: validation.data.status,
        userId: session.user.id,
      },
      where: {
        id: courseId,
      },
    });

    return {
      message: 'Course added succyfully',
      status: 'success',
      data: course,
    };
  } catch (error) {
    console.log(error);

    return {
      message: 'Something happen',
      status: 'error',
    };
  }
}

export async function addChapter({
  data,
  courseId,
}: {
  data: AddChapterSchemaType;
  courseId: string;
}): Promise<ApiResponse> {
  await requiredAdmin();
  try {
    const validation = ADD_CHAPTER_SCHEMA.safeParse(data);
    if (!validation.success) {
      return {
        message: 'Enter valid data',
        status: 'error',
      };
    }

    if (!courseId) {
      return {
        message: 'Course ID is required',
        status: 'error',
      };
    }

    const lastChapter = await prisma.chapter.findFirst({
      where: {
        courseId,
      },
      orderBy: {
        position: 'desc',
      },
      select: {
        position: true,
      },
    });

    const nextPosition = (lastChapter?.position ?? 0) + 1;

    const chapter = await prisma.chapter.create({
      data: {
        title: validation.data.title,
        courseId: courseId,
        position: nextPosition,
      },
    });

    revalidatePath(`/admin/courses/${courseId}/edit`);
    return {
      message: 'Course added succyfully',
      status: 'success',
      data: chapter,
    };
  } catch (error) {
    console.log(error);

    return {
      message: 'Something happen',
      status: 'error',
    };
  }
}

export async function getAllChapters(courseId: string): Promise<ApiResponse> {
  // await requiredAdmin();
  try {
    const chapters = await prisma.chapter.findMany({
      where: {
        courseId,
      },
      orderBy: {
        position: 'asc',
      },
      include: {
        lessons: {
          orderBy: {
            position: 'asc',
          },
        },
      },
    });

    return {
      message: 'Chapters fetched successfully',
      status: 'success',
      data: chapters,
    };
  } catch (error) {
    console.log(error);

    return {
      message: 'Something happen',
      status: 'error',
    };
  }
}
