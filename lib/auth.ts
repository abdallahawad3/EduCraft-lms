import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "./db";
import { emailOTP } from "better-auth/plugins";
import { resend } from "./resend";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),

  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    },
  },

  plugins: [
    emailOTP({
      async sendVerificationOTP({ email, otp }) {
        await resend.emails.send({
          from: "Abdullah LMS <onboarding@resend.dev>",
          to: [email],
          subject: "Abdullah LMS - Your One-Time Password (OTP)",
          html: `
              <html>
                <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                  <p style="font-weight: bold;">Hello,</p>
                  <p style="font-weight: bold;">Your one-time password (OTP) for signing in to Abdullah LMS is:</p>
                  <h2 style="font-weight: bold; background-color: #f0f0f0; padding: 10px;">${otp}</h2>
                  <p style="font-weight: bold;">This OTP is valid for 10 minutes. Please do not share it with anyone.</p>
                  <p style="font-weight: bold;">Thank you for using Abdullah LMS!</p>
                </body>
              </html>
            `,
        });
      },
    }),
  ],
});
