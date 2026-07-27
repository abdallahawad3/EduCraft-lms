import { auth } from '@/lib/auth';
import prisma from '@/lib/db';
import { headers } from 'next/headers';

export async function isUserEnrolledInCourse(
  courseId: string,
): Promise<boolean> {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return false;
  }

  const enrolledCourses = await prisma.enrollment.findUnique({
    where: {
      userId_courseId: {
        userId: session.user.id,
        courseId: courseId,
      },
    },
    select: {
      status: true,
    },
  });

  return enrolledCourses?.status === 'Completed' ? true : false;
}
