"use server";

import { requiredAdmin } from "@/app/data/admin/required-admin";
import prisma from "@/lib/db";
import { getS3Url } from "@/utils/get-url";

export async function getAllCourses() {
  await requiredAdmin();

  const courses = await prisma.course.findMany({
    orderBy: {
      createAt: "desc",
    },
  });

  const coursesWithImage = await Promise.all(
    courses.map(async (course) => {
      const imageUrl = await getS3Url(course.fileKey);

      return {
        ...course,
        imageUrl,
      };
    }),
  );

  return coursesWithImage;
}

export type AdminCourseType = Awaited<ReturnType<typeof getAllCourses>>;
