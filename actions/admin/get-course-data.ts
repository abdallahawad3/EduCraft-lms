'use server';

import { requiredAdmin } from '@/app/data/admin/required-admin';
import prisma from '@/lib/db';
import { notFound } from 'next/navigation';

export async function adminGetCourse(courseId: string) {
  await requiredAdmin();

  const course = await prisma.course.findUnique({
    where: {
      id: courseId,
    },
  });

  if (!course) {
    return notFound();
  }

  return course;
}
