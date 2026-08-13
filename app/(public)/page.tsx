import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { auth } from "@/lib/auth";
import { Sparkles } from "lucide-react";
import { headers } from "next/headers";
import Link from "next/link";

const FEATURES = [
  {
    title: "Comprehensive Course Catalog",
    description:
      "Explore a wide range of courses across various subjects, from technology and business to arts and sciences. Our catalog is designed to cater to learners of all levels.",
    icon: "📚",
  },
  {
    title: "Expert Instructors",
    description:
      "Learn from industry experts and experienced educators who are passionate about teaching. Our instructors bring real-world knowledge and practical insights to every course.",
    icon: "👩‍🏫",
  },
  {
    title: "Flexible Learning",
    description:
      "Study at your own pace with our flexible learning options. Access course materials anytime, anywhere, and fit learning into your busy schedule.",
    icon: "⏰",
  },
  {
    title: "Interactive Learning Experience",
    description:
      "Engage with interactive content, quizzes, and assignments that enhance your learning experience. Our platform encourages active participation and knowledge retention.",
    icon: "🖥️",
  },
  {
    title: "Community Support",
    description:
      "Join a vibrant community of learners and instructors. Share ideas, ask questions, and collaborate with peers to enhance your learning journey.",
    icon: "🤝",
  },
  {
    title: "Certification and Recognition",
    description:
      "Earn certificates upon course completion to showcase your achievements. Our certifications are recognized by industry professionals and can boost your career prospects.",
    icon: "🎓",
  },
  {
    title: "Progress Tracking",
    description:
      "Keep track of your learning progress with our intuitive tracking tools. Monitor your achievements, set goals, and stay motivated throughout your learning journey.",
    icon: "📈",
  },
];

const page = async () => {
  const isAuth = await auth.api.getSession({
    headers: await headers(), // some endpoints might require headers
  });

  return (
    <main className="overflow-hidden bg-background">
      <section className="relative isolate flex justify-center items-center mb-5 py-30 h-screen border-b border-border">
        {/* Background decoration */}
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute left-1/2 -top-55 h-125 w-200 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute -left-75 top-75 h-75 w-75 rounded-full bg-blue-500/10 blur-3xl" />
          <div className="absolute -right-37.5 top-125 h-87.5 w-87.5 rounded-full bg-violet-500/10 blur-3xl" />
        </div>

        <div className="flex flex-col items-center text-center space-y-4 md:pb-20">
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border bg-background/80 px-4 py-2 text-sm font-medium shadow-sm backdrop-blur">
            <Sparkles className="size-4 text-primary" />
            <span>The Future of Online Education</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-medium tracking-tight text-center">
            Elevate Your Learning Experience
          </h1>
          <p className="max-w-175 text-lg text-center text-muted-foreground">
            Discover a world of knowledge at your fingertips. Our platform offers a wide range of
            courses designed to help you achieve your learning goals. Join our community of learners
            and start your journey today!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <Link href="/courses" className={buttonVariants({ size: "lg" })}>
              Explore Courses
            </Link>
            {isAuth ? (
              <>
                {isAuth.user.role === "admin" ? (
                  <Link
                    href="/admin"
                    className={`${buttonVariants({ size: "lg", variant: "outline" })} px-5`}
                  >
                    Go to admin dashboard
                  </Link>
                ) : (
                  <Link
                    href="/dashboard"
                    className={`${buttonVariants({ size: "lg", variant: "outline" })} px-5`}
                  >
                    Go to dashboard
                  </Link>
                )}
              </>
            ) : (
              <Link
                href="/login"
                className={`${buttonVariants({ size: "lg", variant: "outline" })} px-5`}
              >
                Sign in
              </Link>
            )}
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 px-5 md:px-20 sm:grid-rows-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {FEATURES.map((feature, index) => (
          <Card
            className="hover:shadow-2xl hover:scale-[1.02] transition-transform  duration-300"
            key={index}
          >
            <CardHeader>
              <div className="text-3xl mb-4">{feature.icon}</div>
              <CardTitle className="text-lg font-semibold">{feature.title}</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              {feature.description}
            </CardContent>
          </Card>
        ))}
      </section>
    </main>
  );
};

export default page;
