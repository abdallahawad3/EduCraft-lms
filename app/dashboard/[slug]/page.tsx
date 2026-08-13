import { getCourseBySlug } from "@/app/data/courses/get-course";
import RenderDescription from "@/components/rich-text-editor/RenderDescription";
import type { Prisma } from "@/lib/generated/prisma/client";
import { redirect } from "next/navigation";

interface IAppProps {
  params: Promise<{ slug: string }>;
}

const CourseSlug = async ({ params }: IAppProps) => {
  const { slug } = await params;
  const course = await getCourseBySlug(slug);
  const firstChapter = course.chapters[0];
  const firstLesson = firstChapter?.lessons[0];

  if (firstLesson) {
    return redirect(`/dashboard/${course.slug}/${firstLesson.id}`);
  }

  return (
    <div className="mx-auto max-w-4xl py-10">
      <div className="rounded-2xl border bg-card p-8 shadow-sm">
        <div className="mb-6">
          <span className="mb-2 inline-block rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
            Course
          </span>

          <h1 className="text-3xl font-bold tracking-tight">{course.title}</h1>
        </div>

        <div className="mb-8">
          <RenderDescription description={course.description as Prisma.JsonArray} />
        </div>

        <div className="rounded-xl border border-dashed bg-muted/30 p-8 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <svg
              className="h-6 w-6 text-primary"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
            </svg>
          </div>

          <h2 className="text-lg font-semibold">No lessons available yet</h2>

          <p className="mt-2 text-sm text-muted-foreground">
            This course is still being prepared. Lessons will appear here once they are added.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CourseSlug;
