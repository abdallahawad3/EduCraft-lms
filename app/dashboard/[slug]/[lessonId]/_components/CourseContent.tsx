/* eslint-disable react-hooks/static-components */
"use client";
import type { LessonContentType } from "@/app/data/courses/get-lesson";
import RenderDescription from "@/components/rich-text-editor/RenderDescription";
import { Button } from "@/components/ui/button";
import type { Prisma } from "@/lib/generated/prisma/client";
import { CheckCheckIcon, StickyNoteOffIcon } from "lucide-react";

interface IAppProps {
  lesson: LessonContentType;
}

const CourseContent = ({ lesson }: IAppProps) => {
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
        <Button variant={"outline"}>
          <CheckCheckIcon className="size-4 mr-2 text-green-50" />
          Mark as complete
        </Button>
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
