'use server';

import { requiredAdmin } from '@/app/data/admin/required-admin';
import arcjet, { detectBot, fixedWindow } from '@/lib/arcjet';
import prisma from '@/lib/db';
import { ApiResponse } from '@/lib/types';
import {
  CourseSchemeType,
  CREATE_COURSE_SCHEME,
} from '@/lib/validation/create-course';
import { request } from '@arcjet/next';

const aj = arcjet
  .withRule(
    detectBot({
      mode: 'LIVE',
      allow: [],
    }),
  )
  .withRule(
    fixedWindow({
      mode: 'LIVE',
      window: '1m',
      max: 5,
    }),
  );

export async function createCourse(
  data: CourseSchemeType,
): Promise<ApiResponse> {
  const session = await requiredAdmin();

  try {
    const req = await request();
    const decision = await aj.protect(req, { fingerprint: session.user?.id });
    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) {
        return {
          message: 'Too many requests. Please try again later.',
          status: 'error',
        };
      } else {
        return {
          message: 'Your request could not be completed.',
          status: 'error',
        };
      }
    }
    const validation = CREATE_COURSE_SCHEME.safeParse(data);

    if (!validation.success) {
      return {
        status: 'error',
        message: 'Invalid Form data',
      };
    }

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
