import { getEnrolledUser } from "../data/user/get-enrolled-user";
import Link from "next/link";
import PublicCourseCard from "../(public)/_component/PublicCourseCard";
import { getPublicCourses } from "../data/courses/get-courses";

export default async function Page() {
  const [allCourses, enrolledCourses] = await Promise.all([getPublicCourses(), getEnrolledUser()]);

  return (
    <>
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Enrolled Courses</h1>
        <p className="text-muted-foreground">Here are the courses you have enrolled in.</p>
      </div>

      {enrolledCourses.length == 0 ? (
        <div>
          <div className="mt-10 text-center">
            <h2 className="text-2xl font-bold">You have not enrolled in any courses yet.</h2>
            <p className="text-muted-foreground mt-2">
              Browse our courses and start learning today!
            </p>
          </div>

          <Link
            href="/courses"
            className="mt-6 inline-flex items-center rounded-md bg-primary px-4 py-2 text-white hover:bg-primary/90"
          >
            Browse Courses
          </Link>
        </div>
      ) : (
        <>
          <p>You are enrolled in the following courses:</p>
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 ">
            {enrolledCourses.map((course) => (
              <PublicCourseCard
                key={course.course.slug}
                courseUrl={course.course.slug}
                data={course.course}
              />
            ))}
          </div>
        </>
      )}

      <section className="mt-10">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Available Courses</h1>
          <p className="text-muted-foreground">Here are the courses you can enroll in.</p>
        </div>

        <div className="mt-6 ">
          {allCourses.filter(
            (course) => !enrolledCourses.some((enrolled) => enrolled.id === course.id),
          ).length === 0 ? (
            <>Empty State</>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 ">
              {allCourses
                .filter((course) => !enrolledCourses.some((enrolled) => enrolled.id === course.id))
                .map((course) => (
                  <PublicCourseCard data={course} key={course.id} />
                ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
