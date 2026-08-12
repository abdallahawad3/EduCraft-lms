import "server-only";
import { requiredUser } from "../user/required-user";
import prisma from "@/lib/db";
import { notFound } from "next/navigation";

export async function getCourseSidebar(slug: string) {
  const user = await requiredUser();

  const course = await prisma.course.findUnique({
    where: {
      slug,
    },
    select: {
      id: true,
      title: true,
      fileKey: true,
      duration: true,
      level: true,
      category: true,
      slug: true,
      chapters: {
        orderBy: {
          position: "asc",
        },
        select: {
          id: true,
          title: true,
          position: true,
          lessons: {
            orderBy: {
              position: "asc",
            },
            select: {
              id: true,
              title: true,
              position: true,
              description: true,
            },
          },
        },
      },
    },
  });

  if (!course) {
    return notFound();
  }

  const enrollment = await prisma.enrollment.findUnique({
    where: {
      userId_courseId: {
        userId: user.id,
        courseId: course.id,
      },
    },
  });

  if (!enrollment || enrollment.status !== "Completed") {
    return notFound();
  }
  return { course };
}

export type CourseSidebar = Awaited<ReturnType<typeof getCourseSidebar>>;
