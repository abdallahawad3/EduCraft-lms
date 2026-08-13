import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Clock3,
  GraduationCap,
  HelpCircle,
  Mail,
  MessageCircle,
  Send,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

const contactReasons = [
  {
    icon: HelpCircle,
    title: "General questions",
    description: "Have a question about the platform, courses, or how everything works?",
  },
  {
    icon: BookOpen,
    title: "Course support",
    description: "Need help accessing a course, lesson, or understanding your learning progress?",
  },
  {
    icon: ShieldCheck,
    title: "Account & security",
    description: "Having trouble signing in or need help with your account?",
  },
];

const expectations = [
  "Tell us what you need help with",
  "Include any relevant course or lesson",
  "We'll review your message carefully",
  "We'll get back to you as soon as possible",
];

export default function ContactPage() {
  return (
    <main className="overflow-hidden bg-background">
      {/* Hero */}
      <section className="relative isolate">
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute left-1/2 top-[-180px] h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute left-[-180px] top-[300px] h-[300px] w-[300px] rounded-full bg-blue-500/10 blur-3xl" />
          <div className="absolute right-[-150px] top-[450px] h-[350px] w-[350px] rounded-full bg-violet-500/10 blur-3xl" />
        </div>

        <div className="mx-auto max-w-7xl px-6 pb-16 pt-20 lg:px-8 lg:pb-24 lg:pt-28">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border bg-background/80 px-4 py-2 text-sm font-medium shadow-sm backdrop-blur">
              <MessageCircle className="size-4 text-primary" />
              We&apos;re here to help
            </div>

            <h1 className="text-balance text-5xl font-bold tracking-tight sm:text-6xl">
              Let&apos;s talk about
              <span className="block bg-gradient-to-r from-primary via-violet-500 to-blue-500 bg-clip-text text-transparent">
                your learning journey.
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-8 text-muted-foreground sm:text-xl">
              Whether you have a question, need some help, or simply want to share feedback,
              we&apos;d love to hear from you.
            </p>
          </div>
        </div>
      </section>

      {/* Main contact area */}
      <section className="pb-20 lg:pb-28">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 lg:grid-cols-[1.15fr_0.85fr] lg:px-8">
          {/* Form */}
          <div className="relative overflow-hidden rounded-3xl border bg-card shadow-xl shadow-black/5">
            <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-primary/10 blur-3xl" />

            <div className="relative p-6 sm:p-8 lg:p-10">
              <div className="mb-8">
                <div className="mb-5 flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <Send className="size-5" />
                </div>

                <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Send us a message</h2>

                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Fill out the form below and tell us how we can help.
                </p>
              </div>

              <form className="space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">
                      Name
                    </label>

                    <input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Your name"
                      required
                      className="h-11 w-full rounded-xl border bg-background px-4 text-sm outline-none transition-all placeholder:text-muted-foreground/60 focus:border-primary focus:ring-2 focus:ring-primary/10"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      Email
                    </label>

                    <input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="you@example.com"
                      required
                      className="h-11 w-full rounded-xl border bg-background px-4 text-sm outline-none transition-all placeholder:text-muted-foreground/60 focus:border-primary focus:ring-2 focus:ring-primary/10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium">
                    Subject
                  </label>

                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    placeholder="How can we help?"
                    required
                    className="h-11 w-full rounded-xl border bg-background px-4 text-sm outline-none transition-all placeholder:text-muted-foreground/60 focus:border-primary focus:ring-2 focus:ring-primary/10"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">
                    Message
                  </label>

                  <textarea
                    id="message"
                    name="message"
                    rows={7}
                    placeholder="Tell us a little more about what you need..."
                    required
                    className="w-full resize-none rounded-xl border bg-background px-4 py-3 text-sm outline-none transition-all placeholder:text-muted-foreground/60 focus:border-primary focus:ring-2 focus:ring-primary/10"
                  />
                </div>

                <button
                  type="submit"
                  className="group inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/25"
                >
                  Send message
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </button>

                <p className="text-center text-xs text-muted-foreground">
                  By sending this message, you agree to be contacted regarding your request.
                </p>
              </form>
            </div>
          </div>

          {/* Information */}
          <div className="space-y-5">
            {/* Email card */}
            <div className="rounded-3xl border bg-card p-7">
              <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Mail className="size-5" />
              </div>

              <h2 className="mt-5 text-xl font-semibold">Prefer email?</h2>

              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                You can also reach us directly by email. We&apos;re happy to help with questions,
                feedback, or account issues.
              </p>

              <a
                href="mailto:abdullahawad598@gmail.com"
                className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-primary/80"
              >
                hello@example.com
                <ArrowRight className="size-4" />
              </a>
            </div>

            {/* Response time */}
            <div className="rounded-3xl border bg-card p-7">
              <div className="flex size-11 items-center justify-center rounded-xl bg-blue-500/10 text-blue-500">
                <Clock3 className="size-5" />
              </div>

              <h2 className="mt-5 text-xl font-semibold">What happens next?</h2>

              <div className="mt-5 space-y-4">
                {expectations.map((item, index) => (
                  <div key={item} className="flex items-start gap-3">
                    <div className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                      {index + 1}
                    </div>

                    <p className="pt-0.5 text-sm text-muted-foreground">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Help CTA */}
            <div className="relative overflow-hidden rounded-3xl bg-foreground p-7 text-background">
              <div className="absolute -right-10 -top-10 size-32 rounded-full bg-primary/30 blur-2xl" />

              <div className="relative">
                <Sparkles className="size-6 text-primary" />

                <h2 className="mt-5 text-xl font-semibold">Looking for something to learn?</h2>

                <p className="mt-2 text-sm leading-6 text-background/65">
                  You might find what you&apos;re looking for in our growing collection of courses.
                </p>

                <Link
                  href="/courses"
                  className="group mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary"
                >
                  Browse courses
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact reasons */}
      <section className="border-y bg-muted/30">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">
              How can we help?
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Whatever you need, we&apos;re listening.
            </h2>

            <p className="mt-4 text-muted-foreground">
              Send us a message about anything related to your experience on the platform.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {contactReasons.map((reason) => {
              const Icon = reason.icon;

              return (
                <div
                  key={reason.title}
                  className="group rounded-3xl border bg-background p-7 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5"
                >
                  <div className="flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <Icon className="size-5" />
                  </div>

                  <h3 className="mt-6 text-lg font-semibold">{reason.title}</h3>

                  <p className="mt-3 text-sm leading-6 text-muted-foreground">
                    {reason.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section>
        <div className="mx-auto max-w-4xl px-6 py-24 text-center lg:py-32">
          <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <GraduationCap className="size-7" />
          </div>

          <h2 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl">
            Have a question?
            <br />
            Don&apos;t hesitate to ask.
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-lg leading-8 text-muted-foreground">
            We&apos;re building this platform for learners, and your feedback helps us make it
            better.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href="mailto:abdullahawad598@gmail.com"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-primary px-6 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:-translate-y-0.5"
            >
              <Mail className="size-4" />
              Email us
            </a>

            <Link
              href="/about"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border bg-background px-6 text-sm font-semibold transition-colors hover:bg-muted"
            >
              Learn more about us
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
