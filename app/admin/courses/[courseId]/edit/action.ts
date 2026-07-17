'use server';
import { requiredAdmin } from '@/app/data/admin/required-admin';
import prisma from '@/lib/db';
import { ApiResponse } from '@/lib/types';
import {
  CourseSchemeType,
  CREATE_COURSE_SCHEME,
} from '@/lib/validation/create-course';

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
