"use server";

import { requiredAdmin } from "@/app/data/admin/required-admin";
import arcjet, { detectBot, fixedWindow } from "@/lib/arcjet";
import prisma from "@/lib/db";
import { stripe } from "@/lib/stripe";
import { ApiResponse } from "@/lib/types";
import { CourseSchemeType, CREATE_COURSE_SCHEME } from "@/lib/validation/create-course";
import { request } from "@arcjet/next";

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

export async function createCourse(courseData: CourseSchemeType): Promise<ApiResponse> {
  const session = await requiredAdmin();

  try {
    const req = await request();
    const decision = await aj.protect(req, { fingerprint: session.user?.id });
    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) {
        return {
          message: "Too many requests. Please try again later.",
          status: "error",
        };
      } else {
        return {
          message: "Your request could not be completed.",
          status: "error",
        };
      }
    }
    const validation = CREATE_COURSE_SCHEME.safeParse(courseData);

    if (!validation.success) {
      return {
        status: "error",
        message: "Invalid Form data",
      };
    }

    if (!session?.user) {
      return {
        status: "error",
        message: "Unauthorized",
      };
    }

    const data = await stripe.products.create({
      name: validation.data.title,
      description: validation.data.smallDescription,
      default_price_data: {
        currency: "usd",
        unit_amount: +validation.data.price * 100,
      },
    });

    const course = await prisma.course.create({
      data: {
        ...validation.data,
        userId: session?.user.id,
        price: Number(validation.data.price),
        description: JSON.parse(JSON.stringify(courseData.description)),
        stripePriceId: data.default_price as string,
        duration: Number(validation.data.duration),
      },
    });

    return {
      status: "success",
      message: "Course created successfully",
      data: course,
    };
  } catch (error) {
    return {
      status: "error",
      message: "Something went wrong",
    };
  }
}
