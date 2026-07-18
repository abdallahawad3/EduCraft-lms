'use server';

import prisma from '@/lib/db';
import { getS3Url } from '@/utils/get-url';

export async function getPublicCourses() {
  const courses = await prisma.course.findMany({
    where: { status: 'Published' },
    select: {
      title: true,
      smallDescription: true,
      slug: true,
      fileKey: true,
      id: true,
      duration: true,
      price: true,
      category: true,
      level: true,
    },
    orderBy: {
      createAt: 'desc',
    },
  });

  return Promise.all(
    courses.map(async (course) => ({
      ...course,
      imageUrl: await getS3Url(course.fileKey),
    })),
  );
}
export type PublicCourse = Awaited<ReturnType<typeof getPublicCourses>>[number];
