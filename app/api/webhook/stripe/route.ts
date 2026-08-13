import prisma from "@/lib/db";
import { stripe } from "@/lib/stripe";
import { headers } from "next/headers";
import type Stripe from "stripe";

export async function POST(req: Request) {
  const body = await req.text();
  const headerList = await headers();

  const signature = headerList.get("Stripe-Signature") as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (error) {
    console.error("Failed to generate presigned URL:", error);

    return new Response("Webhook Error", { status: 400 });
  }

  const session = event.data.object as Stripe.Checkout.Session;

  if (event.type === "checkout.session.completed") {
    const courseId = session.metadata?.courseId;
    const customerId = session.customer as string;
    if (!courseId) {
      return new Response("Course ID not found", { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: {
        stripeCustomerId: customerId,
      },
    });

    if (!user) {
      return new Response("User not found", { status: 404 });
    }

    await prisma.enrollment.update({
      where: {
        id: session.metadata?.enrollmentId,
      },
      data: {
        userId: user.id,
        courseId: courseId,
        amount: session.amount_total as number,
        status: "Completed",
      },
    });
  }

  return new Response(null, { status: 200 });
}
