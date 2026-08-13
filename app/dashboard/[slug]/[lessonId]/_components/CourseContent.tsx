/* eslint-disable react-hooks/static-components */
"use client";
import type { LessonContentType } from "@/app/data/courses/get-lesson";
import RenderDescription from "@/components/rich-text-editor/RenderDescription";
import { Button } from "@/components/ui/button";
import type { Prisma } from "@/lib/generated/prisma/client";
import { CheckCheckIcon, CheckCircle, StickyNoteOffIcon } from "lucide-react";
import { markLessonComplete } from "../action";
import { useTransition } from "react";
import { tryCatch } from "@/hooks/try-catch";
import { toast } from "sonner";
import { ConfettiEffect } from "@/utils/confetti";

interface IAppProps {
  lesson: LessonContentType;
}

const CourseContent = ({ lesson }: IAppProps) => {
  const [isPending, setTransitionPending] = useTransition();

  const onSubmit = () => {
    setTransitionPending(async () => {
      const { data } = await tryCatch(markLessonComplete(lesson.id, lesson.chapter.course.slug));
      if (data?.status == "error") {
        toast.error(data.message);
        return;
      } else {
        toast.success(data?.message);
        ConfettiEffect();
      }
    });
  };
  function VideoPlayer({ videoUrl, imageUrl }: { videoUrl: string; imageUrl: string }) {
    if (!videoUrl) {
      return (
        <div className="aspect-video bg-muted rounded-lg flex flex-col items-center justify-center">
          <StickyNoteOffIcon className="size-16  text-primary mx-auto mb-4" />
          <p>This lesson don&apos;t have video yet</p>
        </div>
      );
    }

    return (
      <div className="aspect-video bg-black rounded-lg relative overflow-hidden">
        <video poster={imageUrl} controls={true} className="w-full h-full object-cover">
          <source src={videoUrl} type="video/mp4" />
          <source src={videoUrl} type="video/webm" />
          <source src={videoUrl} type="video/ogg" />
          Your Browser dose not support the video tag.
        </video>
      </div>
    );
  }
  return (
    <div className="flex flex-1 w-full flex-col h-full bg-background ">
      <VideoPlayer videoUrl={lesson.videoUrl as string} imageUrl={lesson.imageUrl as string} />
      <div className="py-4 border-b">
        {lesson.lessonProgress.length > 0 ? (
          <Button variant={"outline"} className={"cursor-not-allowed"}>
            <CheckCircle className="size-4 mr-2  dark:text-green-300 text-green-500" />
            Completed
          </Button>
        ) : (
          <Button disabled={isPending} onClick={onSubmit} variant={"outline"}>
            {isPending ? (
              <>
                <svg
                  className="mr-2 h-4 w-4 animate-spin"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Loading..
              </>
            ) : (
              <>
                <CheckCheckIcon className="size-4 mr-2  dark:text-green-300 text-green-500" />
                Mark as complete
              </>
            )}
          </Button>
        )}
      </div>

      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">{lesson.title}</h1>
        <div>
          {lesson.description ? (
            <RenderDescription description={lesson.description as Prisma.JsonObject} />
          ) : (
            "No Description"
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseContent;
