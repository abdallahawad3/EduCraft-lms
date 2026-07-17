// This convert the file to a server action component, so that we can use the server actions feature of Next.js 13.4
'use server';

import { auth } from '@/lib/auth';
import prisma from '@/lib/db';
import { ApiResponse } from '@/lib/types';
import {
  CourseSchemeType,
  CREATE_COURSE_SCHEME,
} from '@/lib/validation/create-course';
import { headers } from 'next/headers';

export async function createCourse(
  data: CourseSchemeType,
): Promise<ApiResponse> {
  try {
    const validation = CREATE_COURSE_SCHEME.safeParse(data);

    if (!validation.success) {
      return {
        status: 'error',
        message: 'Invalid Form data',
      };
    }

    //1- Before any thing we need to get the login user first

    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return {
        status: 'error',
        message: 'Unauthorized',
      };
    }

    const course = await prisma.course.create({
      data: {
        ...validation.data,
        userId: session?.user.id,
        price: Number(validation.data.price),
        duration: Number(validation.data.duration),
      },
    });
    console.log('Course: =>>', course);

    return {
      status: 'success',
      message: 'Course created successfully',
      data: course,
    };
  } catch (error) {
    console.log(error);

    return {
      status: 'error',
      message: 'Something went wrong',
    };
  }
}

export async function getAllCourses(): Promise<ApiResponse> {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return {
        status: 'error',
        message: 'Unauthorized',
      };
    }

    const courses = await prisma.course.findMany({
      include: {
        user: true,
      },
      where: {
        userId: session?.user.id,
      },
    });

    return {
      status: 'success',
      message: 'Courses fetched successfully',
      data: courses,
    };
  } catch (error) {
    return {
      status: 'error',
      message: 'Something went wrong',
    };
  }
}
