import { requiredUser } from "./required-user";
import prisma from "@/lib/db";
import { getS3Url } from "@/utils/get-url";

export async function getEnrolledUser() {
  const user = await requiredUser();

  const data = await prisma.enrollment.findMany({
    where: {
      userId: user.id,
      status: "Completed",
    },
    select: {
      id: true,
      course: {
        select: {
          id: true,
          smallDescription: true,
          title: true,
          fileKey: true,
          level: true,
          slug: true,
          duration: true,
          price: true,
          category: true,
          chapters: {
            select: {
              id: true,
              lessons: {
                select: {
                  id: true,
                },
              },
            },
          },
        },
      },
    },
  });

  const dataWithImage = await Promise.all(
    data.map(async (enrollment) => {
      const imageUrl = await getS3Url(enrollment.course.fileKey);

      return {
        ...enrollment,
        course: {
          ...enrollment.course,
          imageUrl,
        },
      };
    }),
  );

  return dataWithImage;
}
