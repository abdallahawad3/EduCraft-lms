import "server-only";

import { requiredUser } from "../user/required-user";
import prisma from "@/lib/db";
import { notFound } from "next/navigation";
import { getS3Url } from "@/utils/get-url";

export async function getLessonContent(id: string) {
  const user = await requiredUser();

  const lesson = await prisma.lesson.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      title: true,
      description: true,
      thumbnailKey: true,
      videoKey: true,
      position: true,
      lessonProgress: {
        where: {
          userId: user.id,
        },
        select: {
          lessonId: true,
          completed: true,
        },
      },
      chapter: {
        select: {
          courseId: true,
          course: {
            select: {
              slug: true,
            },
          },
        },
      },
    },
  });

  if (!lesson) {
    return notFound();
  }

  const enrollment = await prisma.enrollment.findUnique({
    where: {
      userId_courseId: {
        userId: user.id,
        courseId: lesson.chapter.courseId,
      },
    },
    select: {
      status: true,
    },
  });

  if (!enrollment || enrollment.status !== "Completed") {
    return notFound();
  }

  const [imageUrl, videoUrl] = await Promise.all([
    lesson.thumbnailKey ? getS3Url(lesson.thumbnailKey) : null,
    lesson.videoKey ? getS3Url(lesson.videoKey) : null,
  ]);

  return {
    ...lesson,
    imageUrl,
    videoUrl,
  };
}

export type LessonContentType = Awaited<ReturnType<typeof getLessonContent>>;
