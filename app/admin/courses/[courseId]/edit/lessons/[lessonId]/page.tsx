import { getAdminLesson } from '@/actions/admin/get-admin-lesson';
import { getS3Url } from '@/utils/get-url';
import UpdateLessonForm from './Form';
interface UpdateLessonProps {
  params: Promise<{
    lessonId: string;
    courseId: string;
  }>;
}
const UpdateLesson = async ({ params }: UpdateLessonProps) => {
  const { lessonId, courseId } = await params;

  const lesson = await getAdminLesson(courseId, lessonId);
  if (!lesson) {
    return <div>Lesson not found</div>;
  }
  let imageUrl: string | undefined = undefined;
  let videoUrl: string | undefined = undefined;

  if (lesson.thumbnailKey) {
    imageUrl = await getS3Url(lesson.thumbnailKey || '');
  }

  if (lesson.videoKey) {
    videoUrl = await getS3Url(lesson.videoKey || '');
  }
  return (
    <>
      <UpdateLessonForm
        lessonId={lessonId}
        courseId={courseId}
        lesson={lesson}
        imageUrl={imageUrl}
        videoUrl={videoUrl}
      />
    </>
  );
};

export default UpdateLesson;
