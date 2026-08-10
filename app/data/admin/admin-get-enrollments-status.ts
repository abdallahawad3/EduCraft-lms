import prisma from "@/lib/db";
import { requiredAdmin } from "./required-admin";

export async function adminGetEnrollmentsStatus() {
  await requiredAdmin();

  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const enrollments = await prisma.enrollment.findMany({
    where: {
      createdAt: {
        gte: thirtyDaysAgo,
      },
    },
    select: {
      createdAt: true,
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  const lastThirtyDaysEnrollments: {
    date: string;
    enrollments: number;
  }[] = [];

  for (let i = 29; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);

    lastThirtyDaysEnrollments.push({
      date: date.toISOString().split("T")[0],
      enrollments: 0,
    });
  }

  enrollments.forEach((enrollment) => {
    const enrollmentDate = enrollment.createdAt.toISOString().split("T")[0];

    const day = lastThirtyDaysEnrollments.find((item) => item.date === enrollmentDate);

    if (day) {
      day.enrollments += 1;
    }
  });

  return lastThirtyDaysEnrollments;
}
