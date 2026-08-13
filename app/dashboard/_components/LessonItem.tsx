"use client";
import type { CourseSidebar } from "@/app/data/courses/get-course-sidebar";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Check, Play } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
interface ILessonItemProps {
  lesson: CourseSidebar["course"]["chapters"][0]["lessons"][0];
  slug: string;
  completed: boolean;
}

const LessonItem = ({ lesson, slug, completed }: ILessonItemProps) => {
  const path = usePathname();
  const lessonUrl = path.split("/")[path.split("/").length - 1];

  return (
    <Link
      href={`/dashboard/${slug}/${lesson.id}`}
      className={buttonVariants({
        variant: completed ? "secondary" : "outline",
        className: cn(
          "w-full p-2.5 h-auto flex items-center justify-start gap-2 ",
          "text-sm text-muted-foreground truncate",
          completed &&
            "bg-green-100 dark:bg-green-900/30 border-green-300 dark:border-green-700 hover:bg-green-200 hover:dark:bg-green-900/50",
          lesson.id === lessonUrl &&
            "ring-2 ring-blue-500! ring-offset-2! dark:ring-offset-gray-900! bg-blue-50! dark:bg-blue-900/30! border-blue-400! dark:border-blue-600!",
        ),
      })}
    >
      {/* {lesson.position}. {lesson.title} */}

      <div className="flex items-center gap-2.5 w-full min-w-0">
        <div className="shrink-0">
          {completed ? (
            <div
              className={cn(
                "size-5 rounded-full bg-green-600 dark:bg-green-500  border-2 flex items-center justify-center",
                lesson.id === lessonUrl && "bg-blue-600 dark:bg-blue-500 ",
              )}
            >
              <Check className={cn("size-2.5")} />
            </div>
          ) : (
            <div
              className={cn(
                "size-5 rounded-full border-primary border-2 bg-background flex items-center justify-center",
                lesson.id === lessonUrl && "border-blue-600 dark:border-blue-500 ",
              )}
            >
              <Play
                className={cn(
                  "size-2.5 fill-current",
                  lesson.id === lessonUrl && "text-blue-600 dark:text-blue-500 ",
                )}
              />
            </div>
          )}
        </div>
        <div className="flex flex-col">
          <p className={cn("text-xs font-medium truncate")}>
            {lesson.position}. {lesson.title}
          </p>
          {completed && <p className="text-xs mt-2">Completed</p>}
        </div>
      </div>
    </Link>
  );
};

export default LessonItem;
