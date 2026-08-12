import type { CourseSidebar } from "@/app/data/courses/get-course-sidebar";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Progress } from "@/components/ui/progress";
import { ChevronDown, PlayIcon } from "lucide-react";
import LessonItem from "./LessonItem";
interface ICourseSidebarProps {
  course: CourseSidebar["course"];
}
const CourseSidebar = async ({ course }: ICourseSidebarProps) => {
  return (
    <div className="flex flex-col h-full">
      <div className="pb-4 pr-4 border-b border-border">
        <div className="flex items-center gap-3 mb-3">
          <div className="size-10 flex items-center justify-center rounded-full bg-primary/10 text-primary">
            <PlayIcon className="w-4 h-4 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-base font-semibold leading-tight truncate">{course.title}</h1>
            <p className="text-xs text-muted-foreground mt-1 truncate">{course.category}</p>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-medium">4/10 lessons</span>
          </div>

          <Progress value={55} className="h-2" />
          <p className="text-xs text-muted-foreground">55% complete</p>
        </div>
      </div>
      <div className="py-4 pr-4 space-y-3">
        {course.chapters.map((chapter, idx) => (
          <Collapsible key={chapter.id} defaultOpen={idx === 0}>
            <CollapsibleTrigger
              render={
                <Button
                  variant={"outline"}
                  className="w-full p-4 h-auto flex items-center justify-start gap-2"
                >
                  <div className="shrink-0">
                    <ChevronDown className="size-4 text-primary" />
                  </div>
                  <div className="flex w-full flex-col text-left min-w-0">
                    <p className="text-sm font-medium leading-tight truncate">
                      {chapter.position}. {chapter.title}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1 truncate">
                      {chapter.lessons.length} lessons
                    </p>
                  </div>
                </Button>
              }
            />

            <CollapsibleContent className={"mt-3 pl-6 border-l-2 space-y-3"}>
              {chapter.lessons.map((lesson) => (
                <div key={lesson.id} className="text-sm text-muted-foreground truncate">
                  <LessonItem lesson={lesson} slug={course.slug} />
                </div>
              ))}
            </CollapsibleContent>
          </Collapsible>
        ))}
      </div>
    </div>
  );
};

export default CourseSidebar;
