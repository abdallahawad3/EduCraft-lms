import type { ReactNode } from "react";
import CourseSidebar from "../_components/CourseSidebar";
import { getCourseSidebar } from "@/app/data/courses/get-course-sidebar";
interface IAppProps {
  params: Promise<{
    slug: string;
  }>;
  children: ReactNode;
}

const DashboardCourseSlugLayout = async ({ children, params }: IAppProps) => {
  const { slug } = await params;
  const courseSidebar = await getCourseSidebar(slug);
  return (
    <div className="flex flex-1 gap-4">
      {/* sidebar 30% */}
      <div className="w-80 border-r border-border shrink-0">
        <CourseSidebar course={courseSidebar.course} />
      </div>
      <div className="flex-1">{children}</div>
    </div>
  );
};

export default DashboardCourseSlugLayout;
