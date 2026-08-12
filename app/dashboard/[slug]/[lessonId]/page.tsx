import { getLessonContent } from "@/app/data/courses/get-lesson";
import CourseContent from "./_components/CourseContent";

type Params = Promise<{
  lessonId: string;
}>;

const LessonPage = async ({ params }: { params: Params }) => {
  const { lessonId } = await params;
  const lesson = await getLessonContent(lessonId);

  return <CourseContent lesson={lesson} />;
};

export default LessonPage;
