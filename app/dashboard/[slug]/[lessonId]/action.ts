"use server";

import { requiredUser } from "@/app/data/user/required-user";
import prisma from "@/lib/db";
import type { ApiResponse } from "@/lib/types";
import { revalidatePath } from "next/cache";

export async function markLessonComplete(lessonId: string, slug: string): Promise<ApiResponse> {
  const user = await requiredUser();

  try {
    await prisma.lessonProgress.upsert({
      where: {
        userId_lessonId: {
          userId: user.id,
          lessonId,
        },
      },
      update: {
        completed: true,
      },

      create: {
        lessonId,
        userId: user.id,
        completed: true,
      },
    });

    revalidatePath(`/dashboard/${slug}`);

    return {
      message: "Progress updated",
      status: "success",
    };
  } catch (error) {
    return {
      message: "Failed to mark lesson as complete",
      status: "error",
    };
  }
}
