'use server';

import prisma from '@/lib/db';
import { getS3Url } from '@/utils/get-url';
import { notFound } from 'next/navigation';

export async function getCourseBySlug(slug: string) {
  const course = await prisma.course.findUnique({
    where: { slug },
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
      description: true,
      chapters: {
        select: {
          title: true,
          id: true,
          lessons: {
            select: {
              id: true,
              title: true,
            },
            orderBy: {
              position: 'asc',
            },
          },
        },
        orderBy: {
          position: 'asc',
        },
      },
    },
  });

  if (!course) {
    return notFound();
  }

  const imageUrl = await getS3Url(course.fileKey);

  return { ...course, imageUrl };
}

export type Course = Awaited<ReturnType<typeof getCourseBySlug>>;
