/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  courseCategory,
  courseLevel,
  CourseStatus,
  CREATE_COURSE_SCHEME,
} from "@/lib/validation/create-course";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, PlusIcon, Stars } from "lucide-react";
import Link from "next/link";
import { Controller, useForm, useWatch } from "react-hook-form";
import slugify from "slugify";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type z from "zod";
import RichTextEditor from "@/components/rich-text-editor/Editor";
const CreateCoursePage = () => {
  const form = useForm<z.infer<typeof CREATE_COURSE_SCHEME>>({
    resolver: zodResolver(CREATE_COURSE_SCHEME),
    defaultValues: {
      category: "Web Development",
      description: "",
      duration: "",
      fileKey: "",
      level: "Beginner",
      price: "",
      slug: "",
      smallDescription: "",
      title: "",
      status: "Draft",
    },
  });

  function onSubmit(data: z.infer<typeof CREATE_COURSE_SCHEME>) {
    console.log(data);
  }

  const title = useWatch({
    control: form.control,
    name: "title",
  });

  useEffect(() => {
    form.setValue("slug", slugify(title ? title : "", { lower: true, strict: true }));
  }, [title]);

  return (
    <>
      <div className="flex items-center gap-1 mb-4">
        <Button nativeButton={false} variant={"outline"} render={<Link href={"/admin/courses"} />}>
          <ArrowLeft size={4} />
        </Button>
        <h1 className="text-2xl font-bold">Create Course</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
          <CardDescription>Provide basic information about the course</CardDescription>
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
                name="slug"
                render={({ field, fieldState }) => (
                  <Field className="flex-1" data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="slug">Course Slug</FieldLabel>
                    <div className="flex items-center gap-4">
                      <Input
                        disabled
                        className=""
                        {...field}
                        id="slug"
                        placeholder="slug"
                        aria-invalid={fieldState.invalid}
                      />
                      <Button
                        disabled
                        className="cursor-not-allowed"
                        onClick={() => {
                          const title = form.getValues("title");
                          const slug = slugify(title, { lower: true, strict: true });
                          form.setValue("slug", slug);
                        }}
                      >
                        <Stars size={16} />
                        Generate Slug
                      </Button>
                    </div>
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />

              <Controller
                control={form.control}
                name="smallDescription"
                render={({ field, fieldState }) => (
                  <Field className="flex-1" data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="small-description">Small Description</FieldLabel>
                    <Textarea
                      rows={10}
                      {...field}
                      className="min-h-25 max-h-50"
                      id="small-description"
                      placeholder="Enter small description"
                      aria-invalid={fieldState.invalid}
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
                    <RichTextEditor />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />

              <Controller
                control={form.control}
                name="fileKey"
                render={({ field, fieldState }) => (
                  <Field className="flex-1" data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="file-key">Thumbnail Image</FieldLabel>
                    <Input
                      {...field}
                      id="file-key"
                      placeholder="thumbnail url"
                      aria-invalid={fieldState.invalid}
                    />

                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
              <Controller
                control={form.control}
                name="status"
                render={({ field, fieldState }) => (
                  <Field className="flex-1" data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="status">Status</FieldLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className={"py-5"}>
                        <SelectValue placeholder="Select a status" />
                      </SelectTrigger>

                      <SelectContent className="max-h-40 overflow-y-auto scroll-auto">
                        {CourseStatus.map((status) => (
                          <SelectItem key={status} value={status}>
                            {status}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
                <Controller
                  control={form.control}
                  name="category"
                  render={({ field, fieldState }) => (
                    <Field className="flex-1" data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="category">Category</FieldLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <SelectTrigger className={"py-5"}>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>

                        <SelectContent className="max-h-40 overflow-y-auto">
                          {courseCategory.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                  )}
                />

                <Controller
                  control={form.control}
                  name="level"
                  render={({ field, fieldState }) => (
                    <Field className="flex-1" data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="level">Level</FieldLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <SelectTrigger className={"py-5"}>
                          <SelectValue placeholder="Select a level" />
                        </SelectTrigger>

                        <SelectContent className="max-h-40 overflow-y-auto scroll-auto">
                          {courseLevel.map((level) => (
                            <SelectItem key={level} value={level}>
                              {level}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                  )}
                />

                <Controller
                  control={form.control}
                  name="duration"
                  render={({ field, fieldState }) => (
                    <Field className="flex-1" data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="duration">Duration (hours)</FieldLabel>
                      <Input
                        {...field}
                        id="duration"
                        placeholder="Duration in hours"
                        aria-invalid={fieldState.invalid}
                        type="number"
                        min={0}
                      />

                      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                  )}
                />

                <Controller
                  control={form.control}
                  name="price"
                  render={({ field, fieldState }) => (
                    <Field className="flex-1" data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="price">Price</FieldLabel>
                      <Input
                        {...field}
                        id="price"
                        placeholder="Course price"
                        type="number"
                        min={0}
                        aria-invalid={fieldState.invalid}
                      />

                      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                  )}
                />
              </div>
            </FieldGroup>

            <Button type="submit" className="flex items-center gap-2 w-full">
              <PlusIcon size={16} />
              <span>Create Course</span>
            </Button>
          </form>
        </CardContent>
      </Card>
    </>
  );
};

export default CreateCoursePage;
