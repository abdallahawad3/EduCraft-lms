import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { Toaster } from "@/components/ui/sonner";

import { Outfit } from "next/font/google";

export const metadata: Metadata = {
  title: "LMS Course Platform",
  description:
    "A comprehensive learning management system (LMS) platform that offers a wide range of courses, expert instructors, and interactive learning experiences. Join our community of learners and enhance your skills with flexible learning options and recognized certifications.",
};
const fontSans = Outfit({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${fontSans.variable} h-full antialiased`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Toaster />
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 px-4 md:gap-6 md:py-6 md:px-6 ">
              {children}
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
