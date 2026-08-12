"use client";

import { AdminLesson } from "@/actions/admin/get-admin-lesson";
import Uploader from "@/components/file-uploader/Uploader";
import RichTextEditor from "@/components/rich-text-editor/Editor";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { ADD_LESSON_SCHEMA_WITH_OPTIONAL_FIELDS } from "@/lib/validation/add-lesson";
import { zodResolver } from "@hookform/resolvers/zod";
import { JsonValue } from "@prisma/client/runtime/client";
import { ArrowLeft, PlusIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import { updateLesson } from "./action";
interface UpdateLessonFormProps {
  imageUrl?: string;
  videoUrl?: string;
  courseId: string;
  lessonId: string;
  lesson: AdminLesson;
}
const UpdateLessonForm = ({
  lesson,
  imageUrl,
  videoUrl,
  courseId,
  lessonId,
}: UpdateLessonFormProps) => {
  const [isPending, setUseTransition] = useTransition();
  const router = useRouter();
  const form = useForm<z.infer<typeof ADD_LESSON_SCHEMA_WITH_OPTIONAL_FIELDS>>({
    resolver: zodResolver(ADD_LESSON_SCHEMA_WITH_OPTIONAL_FIELDS),
    defaultValues: {
      title: lesson.title,
      description: lesson.description ?? null,
      thumbnailKey: lesson.thumbnailKey ? lesson.thumbnailKey : "",
      videoKey: lesson.videoKey ? lesson.videoKey : "",
    },
  });

  async function onSubmit(data: z.infer<typeof ADD_LESSON_SCHEMA_WITH_OPTIONAL_FIELDS>) {
    setUseTransition(async () => {
      const { success } = await updateLesson({
        courseId: courseId,
        lessonId: lessonId,
        title: data.title,
        description: data.description,
        thumbnailKey: data.thumbnailKey,
        videoKey: data.videoKey,
      });

      if (success) {
        toast.success("Lesson updated successfully");
        form.reset(data);
      } else {
        toast.error("Failed to update lesson. Please try again.");
      }
    });
  }

  return (
    <>
      <div className="flex items-center gap-1 mb-4">
        <Button variant={"outline"} onClick={() => router.back()}>
          <ArrowLeft size={4} />
        </Button>
        <h1 className="text-2xl font-bold">Back to Course</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Update Lesson</CardTitle>
          <CardDescription>
            Update the lesson details below. Make sure to fill in all required fields and provide
            accurate information. You can also upload a thumbnail image and video for the lesson.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              <Controller
                name="title"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="title">Course Title</FieldLabel>
                    <Input
                      {...field}
                      id="title"
                      aria-invalid={fieldState.invalid}
                      placeholder="Enter course title"
                      autoComplete="off"
                    />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />

              <Controller
                control={form.control}
                name="description"
                render={({ field, fieldState }) => (
                  <Field className="flex-1" data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="description">Description</FieldLabel>
                    <RichTextEditor content={field.value} onChange={field.onChange} />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />

              <Controller
                control={form.control}
                name="thumbnailKey"
                render={({ field, fieldState }) => (
                  <Field className="flex-1" data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="file-key">Thumbnail Image</FieldLabel>
                    <Uploader
                      imageUrl={imageUrl}
                      type="image"
                      onChange={field.onChange}
                      value={field.value}
                    />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />

              <Controller
                control={form.control}
                name="videoKey"
                render={({ field, fieldState }) => (
                  <Field className="flex-1" data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="file-key">Video</FieldLabel>
                    <Uploader
                      videoUrl={videoUrl}
                      onChange={field.onChange}
                      value={field.value}
                      type="video"
                    />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
            </FieldGroup>

            <Button disabled={isPending} type="submit" className="flex items-center gap-2 w-full">
              {isPending ? (
                <>
                  <svg
                    className="animate-spin"
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
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.046 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                </>
              ) : (
                <>
                  <PlusIcon size={16} />
                  <span>Update Lesson</span>
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </>
  );
};

export default UpdateLessonForm;
