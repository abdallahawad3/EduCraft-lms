"use client";
import Link from "next/link";
import "./globals.css";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Compass,
  GraduationCap,
  Home,
  Search,
  Sparkles,
} from "lucide-react";

export default function NotFound() {
  return (
    <html lang="en">
      <body>
        <main className="relative flex min-h-[calc(100vh-4rem)] items-center overflow-hidden bg-background">
          {/* Background decoration */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute left-1/2 top-[-20%] h-150 w-225 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />

            <div className="absolute -left-32 -bottom-25 h-87.5 w-87.5 rounded-full bg-blue-500/10 blur-3xl" />

            <div className="absolute -right-32 top-1/3 h-100 w-100 rounded-full bg-violet-500/10 blur-3xl" />

            {/* Grid */}
            <div
              className="absolute inset-0 opacity-[0.035]"
              style={{
                backgroundImage:
                  "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
                backgroundSize: "48px 48px",
              }}
            />
          </div>

          <div className="relative mx-auto w-full max-w-6xl px-6 py-20 lg:px-8">
            <div className="grid items-center gap-14 lg:grid-cols-[1fr_0.9fr]">
              {/* Content */}
              <div className="text-center lg:text-left">
                {/* Small badge */}
                <div className="mb-7 inline-flex items-center gap-2 rounded-full border bg-background/80 px-4 py-2 text-sm font-medium shadow-sm backdrop-blur">
                  <Compass className="size-4 text-primary" />
                  <span>Looks like you took a wrong turn</span>
                </div>

                {/* 404 */}
                <div className="relative">
                  <h1 className="select-none text-[9rem] font-black leading-none tracking-[-0.08em] text-foreground/6 sm:text-[12rem] lg:text-[14rem]">
                    404
                  </h1>

                  <div className="absolute inset-0 flex items-center justify-center lg:justify-start">
                    <span className="bg-linear-to-r from-primary via-violet-500 to-blue-500 bg-clip-text text-7xl font-black tracking-tight text-transparent sm:text-8xl">
                      404
                    </span>
                  </div>
                </div>

                <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
                  This lesson seems to be missing.
                </h2>

                <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg lg:mx-0">
                  The page you&apos;re looking for may have moved, been removed, or perhaps
                  it&apos;s a lesson we haven&apos;t created yet.
                </p>

                {/* Actions */}
                <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
                  <Link
                    href="/"
                    className="group inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-primary px-6 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/25"
                  >
                    <Home className="size-4" />
                    Back home
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                  </Link>

                  <Link
                    href="/courses"
                    className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border bg-background px-6 text-sm font-semibold transition-colors hover:bg-muted"
                  >
                    <BookOpen className="size-4" />
                    Explore courses
                  </Link>
                </div>

                <div className="mt-7 flex items-center justify-center gap-2 text-sm text-muted-foreground lg:justify-start">
                  <ArrowLeft className="size-4" />
                  <button
                    type="button"
                    onClick={() => window.history.back()}
                    className="underline-offset-4 hover:text-foreground hover:underline"
                  >
                    Go back to the previous page
                  </button>
                </div>
              </div>

              {/* Illustration */}
              <div className="relative mx-auto w-full max-w-md">
                {/* Glow */}
                <div className="absolute inset-10 rounded-full bg-primary/20 blur-3xl" />

                {/* Floating cards */}
                <div className="absolute -left-3 top-16 hidden rounded-2xl border bg-background/90 p-3 shadow-xl backdrop-blur-sm sm:block">
                  <div className="flex items-center gap-2">
                    <div className="flex size-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <BookOpen className="size-4" />
                    </div>

                    <div>
                      <div className="h-2.5 w-16 rounded-full bg-foreground/10" />
                      <div className="mt-1.5 h-2 w-10 rounded-full bg-muted" />
                    </div>
                  </div>
                </div>

                <div className="absolute -right-2 bottom-20 hidden rounded-2xl border bg-background/90 p-3 shadow-xl backdrop-blur-sm sm:block">
                  <div className="flex items-center gap-2">
                    <div className="flex size-9 items-center justify-center rounded-xl bg-green-500/10 text-green-500">
                      <Sparkles className="size-4" />
                    </div>

                    <div>
                      <div className="h-2.5 w-14 rounded-full bg-foreground/10" />
                      <div className="mt-1.5 h-2 w-9 rounded-full bg-muted" />
                    </div>
                  </div>
                </div>

                {/* Main illustration */}
                <div className="relative aspect-square rounded-[2.5rem] border bg-card p-6 shadow-2xl shadow-black/10 sm:p-8">
                  <div className="absolute inset-4 rounded-4xl border border-dashed border-primary/20" />

                  <div className="relative flex h-full flex-col items-center justify-center">
                    {/* Graduation cap */}
                    <div className="relative mb-7">
                      <div className="absolute -inset-6 rounded-full bg-primary/10 blur-2xl" />

                      <div className="relative flex size-28 rotate-[-4deg] items-center justify-center rounded-3xl bg-linear-to-br from-primary to-violet-600 shadow-2xl shadow-primary/30 sm:size-32">
                        <GraduationCap className="size-16 text-white sm:size-20" />
                      </div>

                      {/* Tassel */}
                      <div className="absolute -right-2 top-5 h-10 w-1.5 rotate-25 rounded-full bg-yellow-400" />
                      <div className="absolute -right-5 top-12 size-3 rounded-full bg-yellow-400" />
                    </div>

                    <div className="text-center">
                      <div className="text-2xl font-bold">Lost your way?</div>

                      <p className="mt-2 max-w-xs text-sm leading-6 text-muted-foreground">
                        No worries. Every great learning journey has a wrong turn.
                      </p>
                    </div>

                    {/* Fake progress */}
                    <div className="mt-8 w-full max-w-xs">
                      <div className="mb-2 flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">Finding your course...</span>
                        <span className="font-semibold text-primary">?</span>
                      </div>

                      <div className="h-2 overflow-hidden rounded-full bg-muted">
                        <div className="h-full w-[42%] rounded-full bg-linear-to-r from-primary to-violet-500" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Decorative dots */}
                <div className="absolute -right-3 top-8 grid grid-cols-3 gap-2 opacity-60">
                  {Array.from({ length: 9 }).map((_, index) => (
                    <span key={index} className="size-1.5 rounded-full bg-primary" />
                  ))}
                </div>

                <div className="absolute -bottom-2 left-8 flex gap-2 opacity-60">
                  <span className="size-2 rounded-full bg-blue-500" />
                  <span className="size-2 rounded-full bg-violet-500" />
                  <span className="size-2 rounded-full bg-primary" />
                </div>
              </div>
            </div>

            {/* Bottom quick links */}
            <div className="mx-auto mt-20 max-w-3xl border-t pt-8">
              <div className="grid gap-3 sm:grid-cols-3">
                <Link
                  href="/"
                  className="group flex items-center gap-3 rounded-2xl border bg-background/60 p-4 transition-all hover:border-primary/30 hover:bg-muted/50"
                >
                  <div className="flex size-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Home className="size-4" />
                  </div>

                  <div className="min-w-0">
                    <div className="text-sm font-semibold">Homepage</div>
                    <div className="text-xs text-muted-foreground">Start here</div>
                  </div>

                  <ArrowRight className="ml-auto size-4 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
                </Link>

                <Link
                  href="/courses"
                  className="group flex items-center gap-3 rounded-2xl border bg-background/60 p-4 transition-all hover:border-primary/30 hover:bg-muted/50"
                >
                  <div className="flex size-9 items-center justify-center rounded-xl bg-blue-500/10 text-blue-500">
                    <Search className="size-4" />
                  </div>

                  <div className="min-w-0">
                    <div className="text-sm font-semibold">Courses</div>
                    <div className="text-xs text-muted-foreground">Find something new</div>
                  </div>

                  <ArrowRight className="ml-auto size-4 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
                </Link>

                <Link
                  href="/about"
                  className="group flex items-center gap-3 rounded-2xl border bg-background/60 p-4 transition-all hover:border-primary/30 hover:bg-muted/50"
                >
                  <div className="flex size-9 items-center justify-center rounded-xl bg-violet-500/10 text-violet-500">
                    <Sparkles className="size-4" />
                  </div>

                  <div className="min-w-0">
                    <div className="text-sm font-semibold">About us</div>
                    <div className="text-xs text-muted-foreground">Learn about the platform</div>
                  </div>

                  <ArrowRight className="ml-auto size-4 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
                </Link>
              </div>
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
