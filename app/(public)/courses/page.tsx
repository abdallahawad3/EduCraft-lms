import { getPublicCourses } from '@/app/data/courses/get-courses';
import { Suspense } from 'react';
import PublicCourseCard, {
  PublicCourseSkeleton,
} from '../_component/PublicCourseCard';

export default async function Page() {
  return (
    <div className="py-8">
      <div className="flex flex-col space-y-2 mb-10">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
          Explore Courses
        </h1>
        <p className="text-lg text-muted-foreground max-w-md">
          Discover our wide range of courses and start learning today!
        </p>
      </div>
      <Suspense fallback={<RenderSkeletons />}>
        <RendedCourses />
      </Suspense>
    </div>
  );
}

async function RendedCourses() {
  const courses = await getPublicCourses();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {courses.map((course) => (
        <PublicCourseCard data={course} key={course.id} />
      ))}
    </div>
  );
}

function RenderSkeletons() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, index) => (
        <PublicCourseSkeleton key={index} />
      ))}
    </div>
  );
}
