'use server';
import { requiredAdmin } from '@/app/data/admin/required-admin';
import prisma from '@/lib/db';

export async function getAllCourses() {
  await requiredAdmin();

  const courses = await prisma.course.findMany({
    orderBy: {
      createAt: 'desc',
    },
  });

  return courses;
}

export type AdminCourseType = Awaited<ReturnType<typeof getAllCourses>>;
