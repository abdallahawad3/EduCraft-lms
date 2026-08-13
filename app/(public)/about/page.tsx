import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  GraduationCap,
  Heart,
  Layers3,
  PlayCircle,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
  Zap,
} from "lucide-react";

const values = [
  {
    icon: Target,
    title: "Learn with purpose",
    description:
      "Every course is designed around practical outcomes, helping you move from understanding concepts to actually using them.",
  },
  {
    icon: Zap,
    title: "Progress without friction",
    description:
      "A focused learning experience keeps your courses, lessons, progress, and achievements in one simple place.",
  },
  {
    icon: Users,
    title: "Built for real learners",
    description:
      "Whether you're starting from scratch or sharpening existing skills, the platform is designed around your learning journey.",
  },
  {
    icon: Heart,
    title: "Quality over quantity",
    description:
      "We believe great education isn't about having the most courses. It's about making every learning experience worthwhile.",
  },
];

const features = [
  "Structured courses and chapters",
  "Lesson-by-lesson learning",
  "Personal learning progress",
  "Rich, interactive course content",
  "Secure authentication",
  "Flexible course management",
];

export default function AboutPage() {
  return (
    <main className="overflow-hidden bg-background">
      {/* Hero */}
      <section className="relative isolate">
        {/* Background decoration */}
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute left-1/2 top-[-220px] h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute left-[-200px] top-[300px] h-[300px] w-[300px] rounded-full bg-blue-500/10 blur-3xl" />
          <div className="absolute right-[-150px] top-[500px] h-[350px] w-[350px] rounded-full bg-violet-500/10 blur-3xl" />
        </div>

        <div className="mx-auto max-w-7xl px-6 pb-24 pt-20 lg:px-8 lg:pb-32 lg:pt-28">
          <div className="mx-auto max-w-4xl text-center">
            {/* Eyebrow */}
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border bg-background/80 px-4 py-2 text-sm font-medium shadow-sm backdrop-blur">
              <Sparkles className="size-4 text-primary" />
              <span>Learning should feel exciting</span>
            </div>

            <h1 className="text-balance text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
              Learn something new.
              <br />
              <span className="bg-gradient-to-r from-primary via-violet-500 to-blue-500 bg-clip-text text-transparent">
                Build something great.
              </span>
            </h1>

            <p className="mx-auto mt-7 max-w-2xl text-pretty text-lg leading-8 text-muted-foreground sm:text-xl">
              We&apos;re building a learning experience that makes it easier to discover valuable
              knowledge, stay motivated, and turn what you learn into real-world skills.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/courses"
                className="group inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-primary px-6 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/25"
              >
                Explore courses
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </Link>

              <Link
                href="/"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border bg-background px-6 text-sm font-semibold transition-colors hover:bg-muted"
              >
                <PlayCircle className="size-4" />
                Start learning
              </Link>
            </div>
          </div>

          {/* Hero visual */}
          <div className="relative mx-auto mt-20 max-w-5xl">
            <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-r from-primary/20 via-violet-500/20 to-blue-500/20 blur-2xl" />

            <div className="relative overflow-hidden rounded-3xl border bg-card shadow-2xl">
              {/* Fake dashboard header */}
              <div className="flex items-center gap-2 border-b px-5 py-4">
                <div className="size-3 rounded-full bg-red-400/80" />
                <div className="size-3 rounded-full bg-yellow-400/80" />
                <div className="size-3 rounded-full bg-green-400/80" />

                <div className="ml-4 h-7 max-w-md flex-1 rounded-lg bg-muted" />
              </div>

              <div className="grid gap-0 md:grid-cols-[220px_1fr]">
                {/* Sidebar */}
                <div className="hidden border-r bg-muted/30 p-5 md:block">
                  <div className="mb-8 flex items-center gap-2">
                    <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                      <GraduationCap className="size-4" />
                    </div>
                    <div className="h-3 w-20 rounded bg-foreground/15" />
                  </div>

                  <div className="space-y-3">
                    {[80, 65, 75, 50, 70].map((width, index) => (
                      <div
                        key={index}
                        className="h-9 rounded-lg bg-muted"
                        style={{ width: `${width}%` }}
                      />
                    ))}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 sm:p-8">
                  <div className="mb-8">
                    <div className="mb-3 h-4 w-28 rounded bg-primary/20" />
                    <div className="h-8 w-3/4 rounded-lg bg-foreground/10" />
                    <div className="mt-3 h-3 w-1/2 rounded bg-muted" />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-3">
                    {[
                      {
                        icon: BookOpen,
                        label: "Courses",
                        value: "Learn",
                      },
                      {
                        icon: Layers3,
                        label: "Lessons",
                        value: "Practice",
                      },
                      {
                        icon: CheckCircle2,
                        label: "Progress",
                        value: "Achieve",
                      },
                    ].map((item) => {
                      const Icon = item.icon;

                      return (
                        <div key={item.label} className="rounded-2xl border bg-background p-5">
                          <div className="mb-5 flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                            <Icon className="size-5" />
                          </div>

                          <div className="text-sm text-muted-foreground">{item.label}</div>

                          <div className="mt-1 text-lg font-semibold">{item.value}</div>

                          <div className="mt-4 h-2 overflow-hidden rounded-full bg-muted">
                            <div className="h-full w-2/3 rounded-full bg-primary" />
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="mt-5 rounded-2xl border p-5">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm font-semibold">Your learning journey</div>
                        <div className="mt-1 text-xs text-muted-foreground">
                          Keep going — you&apos;re making progress.
                        </div>
                      </div>

                      <div className="text-sm font-semibold text-primary">68%</div>
                    </div>

                    <div className="mt-4 h-2 overflow-hidden rounded-full bg-muted">
                      <div className="h-full w-[68%] rounded-full bg-gradient-to-r from-primary to-violet-500" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="border-y bg-muted/30">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-28">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div>
              <div className="mb-5 inline-flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <Target className="size-6" />
              </div>

              <p className="text-sm font-semibold uppercase tracking-widest text-primary">
                Our mission
              </p>

              <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                Education should open doors, not create barriers.
              </h2>
            </div>

            <div className="space-y-5 text-base leading-8 text-muted-foreground sm:text-lg">
              <p>
                Learning is one of the most powerful ways to change what&apos;s possible. But
                finding the right material, staying organized, and maintaining momentum can make the
                process harder than it needs to be.
              </p>

              <p>
                That&apos;s why we&apos;re creating a focused learning platform where courses are
                structured clearly, lessons are easy to follow, and your progress is always visible.
              </p>

              <p>
                The goal is simple:{" "}
                <span className="font-semibold text-foreground">
                  spend less time figuring out how to learn and more time actually learning.
                </span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section>
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-28">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">
              What we believe
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Designed around better learning
            </h2>

            <p className="mt-4 text-muted-foreground">
              Everything starts with a simple question: how can we make learning more useful,
              enjoyable, and achievable?
            </p>
          </div>

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => {
              const Icon = value.icon;

              return (
                <div
                  key={value.title}
                  className="group rounded-3xl border bg-card p-7 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5"
                >
                  <div className="mb-6 flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <Icon className="size-5" />
                  </div>

                  <h3 className="text-lg font-semibold">{value.title}</h3>

                  <p className="mt-3 text-sm leading-6 text-muted-foreground">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Platform section */}
      <section className="relative overflow-hidden bg-foreground text-background">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-0 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-primary/20 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-28">
          <div className="grid gap-14 lg:grid-cols-2 lg:items-center">
            <div>
              <div className="mb-6 flex size-14 items-center justify-center rounded-2xl bg-white/10">
                <GraduationCap className="size-7 text-primary" />
              </div>

              <p className="text-sm font-semibold uppercase tracking-widest text-primary">
                The platform
              </p>

              <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                Everything you need to keep moving forward.
              </h2>

              <p className="mt-6 max-w-xl text-base leading-7 text-background/65 sm:text-lg">
                From discovering a course to completing the final lesson, every part of the
                experience is designed to keep your learning journey clear and focused.
              </p>

              <Link
                href="/courses"
                className="group mt-8 inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all hover:gap-3 hover:brightness-110"
              >
                Explore the platform
                <ArrowRight className="size-4" />
              </Link>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {features.map((feature) => (
                <div
                  key={feature}
                  className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm"
                >
                  <CheckCircle2 className="size-5 shrink-0 text-primary" />
                  <span className="text-sm font-medium text-background/90">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Trust / technology */}
      <section>
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-28">
          <div className="rounded-[2rem] border bg-gradient-to-br from-muted/80 via-background to-primary/5 p-8 sm:p-12 lg:p-16">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
              <div>
                <div className="mb-5 flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <ShieldCheck className="size-6" />
                </div>

                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                  Built with care.
                  <br />
                  Ready to grow with you.
                </h2>

                <p className="mt-5 max-w-xl leading-7 text-muted-foreground">
                  A modern learning platform should feel fast and simple while taking security,
                  reliability, and your learning data seriously.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {[
                  {
                    icon: ShieldCheck,
                    title: "Secure",
                    text: "Authentication & protected access",
                  },
                  {
                    icon: Zap,
                    title: "Fast",
                    text: "Modern, responsive experience",
                  },
                  {
                    icon: Layers3,
                    title: "Structured",
                    text: "Courses built for clarity",
                  },
                  {
                    icon: Users,
                    title: "Learner-first",
                    text: "Focused on your experience",
                  },
                ].map((item) => {
                  const Icon = item.icon;

                  return (
                    <div key={item.title} className="rounded-2xl border bg-background/80 p-5">
                      <Icon className="size-5 text-primary" />

                      <h3 className="mt-4 font-semibold">{item.title}</h3>

                      <p className="mt-1 text-xs leading-5 text-muted-foreground">{item.text}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="border-t">
        <div className="mx-auto max-w-4xl px-6 py-24 text-center lg:py-32">
          <div className="mx-auto mb-6 flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <Sparkles className="size-7" />
          </div>

          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Your next skill starts here.
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-lg leading-8 text-muted-foreground">
            Choose something you&apos;ve always wanted to learn, take the first lesson, and start
            building momentum today.
          </p>

          <div className="mt-9">
            <Link
              href="/courses"
              className="group inline-flex items-center gap-2 rounded-xl bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:-translate-y-0.5 hover:shadow-xl"
            >
              Browse courses
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
