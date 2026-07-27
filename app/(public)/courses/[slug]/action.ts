'use server';

import { requiredUser } from '@/app/data/user/required-user';
import arcjet, { fixedWindow } from '@/lib/arcjet';
import prisma from '@/lib/db';
import { stripe } from '@/lib/stripe';
import { ApiResponse } from '@/lib/types';
import { request } from '@arcjet/next';
import { redirect } from 'next/navigation';
import Stripe from 'stripe';

const aj = arcjet.withRule(
  fixedWindow({
    mode: 'LIVE',
    window: '1m',
    max: 5,
  }),
);

export async function enrollInCourseAction(
  courseId: string,
): Promise<ApiResponse | never> {
  const user = await requiredUser();
  let checkoutUrl: string;
  try {
    const req = await request();
    const decision = await aj.protect(req, {
      fingerprint: user.id,
    });

    if (decision.isDenied()) {
      return {
        message: 'Too many requests. Please try again later.',
        status: 'error',
      };
    }
    const course = await prisma.course.findUnique({
      where: { id: courseId },
      select: {
        id: true,
        title: true,
        price: true,
        slug: true,
      },
    });

    if (!course) {
      return {
        message: 'Course not found',
        status: 'error',
      };
    }
    let stripCustomerId: string;
    const userWithStripCustomerId = await prisma.user.findUnique({
      where: { id: user.id },
      select: {
        stripeCustomerId: true,
      },
    });

    if (userWithStripCustomerId?.stripeCustomerId) {
      stripCustomerId = userWithStripCustomerId.stripeCustomerId;
    } else {
      const stripeCustomer = await stripe.customers.create({
        email: user.email,
        name: user.name,
        metadata: {
          userId: user.id,
        },
      });
      stripCustomerId = stripeCustomer.id;
      await prisma.user.update({
        where: { id: user.id },
        data: { stripeCustomerId: stripCustomerId },
      });
    }

    const result = await prisma.$transaction(async (tx) => {
      const existingEnrollment = await tx.enrollment.findUnique({
        where: {
          userId_courseId: {
            userId: user.id,
            courseId: courseId,
          },
        },
        select: {
          status: true,
          id: true,
        },
      });
      if (existingEnrollment?.status === 'Completed') {
        return {
          message: 'You have already enrolled in this course',
          status: 'success',
        };
      }

      let enrollment;

      if (existingEnrollment) {
        enrollment = await tx.enrollment.update({
          where: {
            id: existingEnrollment.id,
          },
          data: {
            amount: course.price,
            status: 'Pending',
            updatedAt: new Date(),
          },
        });
      } else {
        enrollment = await tx.enrollment.create({
          data: {
            userId: user.id,
            courseId: course.id,
            amount: course.price,
            status: 'Pending',
          },
        });
      }

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        mode: 'payment',
        customer: stripCustomerId,
        line_items: [
          {
            quantity: 1,
            price: 'price_1TxqOjP4glHLkJSLhEMSm6Rq',
          },
        ],
        success_url: `${process.env.BETTER_AUTH_URL}/payment/success?enrollmentId=${enrollment.id}`,
        cancel_url: `${process.env.BETTER_AUTH_URL}/payment/cancel?enrollmentId=${enrollment.id}`,
        metadata: {
          userId: user.id,
          courseId: course.id,
          enrollmentId: enrollment.id,
        },
      });

      return {
        enrollment,
        checkoutUrl: session.url,
      };
    });

    checkoutUrl = result.checkoutUrl as string;
  } catch (error) {
    if (error instanceof Stripe.errors.StripeAPIError) {
      return {
        message: 'Stripe API error occurred',
        status: 'error',
      };
    }
    return {
      message: 'Failed to enroll in course',
      status: 'error',
    };
  }

  redirect(checkoutUrl);
}
