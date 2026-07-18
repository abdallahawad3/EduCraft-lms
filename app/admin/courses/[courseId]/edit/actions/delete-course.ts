"use server"
import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";

export const deleteChapter = async (chapterId: string) => {
  try {
    const chapter = await prisma.chapter.findUnique({
      where: {
        id: chapterId,
      },
    });

    if (!chapter) {
      return {
        message: "Chapter not found",
        status: "error",
      };
    }

    await prisma.chapter.delete({
      where: {
        id: chapterId,
      },
    });

    revalidatePath(`/admin/courses/${chapter.courseId}/edit`);

    return {
      message: "Chapter deleted successfully",
      status: "success",
    };
  } catch (error) {
    console.log(error);

    return {
      message: "Something went wrong",
      status: "error",
    };
  }
};
