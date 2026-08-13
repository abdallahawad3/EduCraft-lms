"use server";

import { requiredAdmin } from "@/app/data/admin/required-admin";
import arcjet, { detectBot, fixedWindow } from "@/lib/arcjet";
import prisma from "@/lib/db";
import { stripe } from "@/lib/stripe";
import { ApiResponse } from "@/lib/types";
import { request } from "@arcjet/next";
import { revalidatePath } from "next/cache";

const aj = arcjet
  .withRule(
    detectBot({
      mode: "LIVE",
      allow: [],
    }),
  )
  .withRule(
    fixedWindow({
      mode: "LIVE",
      window: "1m",
      max: 5,
    }),
  );

export async function deleteCourse(courseId: string): Promise<ApiResponse> {
  const session = await requiredAdmin();

  try {
    const req = await request();
    const decision = await aj.protect(req, {
      fingerprint: session.user?.id,
    });

    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) {
        return {
          status: "error",
          message: "Too many requests. Please try again later.",
        };
      }

      return {
        status: "error",
        message: "Your request could not be completed.",
      };
    }

    // Make sure the user is authenticated
    if (!session?.user) {
      return {
        status: "error",
        message: "Unauthorized",
      };
    }

    // Find the course first
    const course = await prisma.course.findUnique({
      where: {
        id: courseId,
      },
    });

    if (!course) {
      return {
        status: "error",
        message: "Course not found",
      };
    }

    // Delete the Stripe product
    if (course.stripePriceId) {
      const price = await stripe.prices.retrieve(course.stripePriceId);

      if (typeof price.product === "string") {
        await stripe.products.update(price.product, {
          active: false,
        });
      }
    }

    // Delete the course from your database
    await prisma.$transaction(async (tx) => {
      await tx.chapter.deleteMany({
        where: {
          courseId,
        },
      });

      await tx.course.delete({
        where: {
          id: courseId,
        },
      });
    });

    revalidatePath("/admin/courses");
    return {
      status: "success",
      message: "Course deleted successfully",
    };
  } catch (error) {
    console.error("DELETE_COURSE_ERROR:", error);

    return {
      status: "error",
      message: "Something went wrong while deleting the course",
    };
  }
}
