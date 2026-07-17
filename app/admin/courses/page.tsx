import { getAllCourses } from '@/actions/admin/get-admin-data';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import AdminCourseCard from './_components/AdminCourseCard';

const page = async () => {
  const courses = await getAllCourses();

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-medium tracking-tight">Your Courses</h1>
        <Button
          nativeButton={false}
          render={<Link href={'/admin/courses/create'} />}
        >
          <span className="text-sm font-medium">Create Course</span>
        </Button>
      </div>

      <div>
        <p className="text-muted-foreground">
          Here you will find all your courses.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-7">
        {courses.map((course) => (
          <AdminCourseCard course={course} key={course.id} />
        ))}
      </div>
    </>
  );
};

export default page;
