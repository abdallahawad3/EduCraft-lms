import prisma from "@/lib/db";
import { requiredAdmin } from "./required-admin";

export async function adminGetDashboardStatus() {
  await requiredAdmin();

  const [totalUsers, totalCustomers, totalCourses, totalLessons] = await Promise.all([
    prisma.user.count(),
    // Total customers
    prisma.user.count({
      where: {
        enrollments: {
          some: {},
        },
      },
    }),
    // Total courses

    prisma.course.count(),
    // Total lessons
    prisma.lesson.count(),
  ]);

  return {
    totalUsers,
    totalCustomers,
    totalCourses,
    totalLessons,
  };
}
