import { getCourseBySlug } from "@/app/data/courses/get-course";
import RenderDescription from "@/components/rich-text-editor/RenderDescription";
import type { Prisma } from "@/lib/generated/prisma/client";

interface IAppProps {
  params: Promise<{ slug: string }>;
}

const CourseSlug = async ({ params }: IAppProps) => {
  const { slug } = await params;
  const course = await getCourseBySlug(slug);

  return (
    <div>
      <h1 className="text-3xl text-primary border-b-2  tracking-tight font-semibold  pb-2 mb-2">
        {course.title}
      </h1>

      <RenderDescription description={course.description as Prisma.JsonArray} />
    </div>
  );
};

export default CourseSlug;
