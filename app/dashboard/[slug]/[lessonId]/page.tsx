import { Suspense } from "react";
import { getLessonContent } from "@/app/data/courses/get-lesson";
import CourseContent from "./_components/CourseContent";
import CourseContentSkeleton from "./_components/CourseContentSkeleton";

type Params = Promise<{
  lessonId: string;
}>;

const LessonContent = async ({ lessonId }: { lessonId: string }) => {
  const lesson = await getLessonContent(lessonId);

  return <CourseContent lesson={lesson} />;
};

const LessonPage = async ({ params }: { params: Params }) => {
  const { lessonId } = await params;

  return (
    <Suspense fallback={<CourseContentSkeleton />}>
      <LessonContent lessonId={lessonId} />
    </Suspense>
  );
};

export default LessonPage;
