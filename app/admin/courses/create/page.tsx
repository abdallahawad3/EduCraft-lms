/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import Uploader from '@/components/file-uploader/Uploader';
import RichTextEditor from '@/components/rich-text-editor/Editor';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { tryCatch } from '@/hooks/try-catch';
import {
  courseCategory,
  courseLevel,
  CourseStatus,
  CREATE_COURSE_SCHEME,
} from '@/lib/validation/create-course';
import { ConfettiEffect } from '@/utils/confetti';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft, PlusIcon, Stars } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useTransition } from 'react';
import { Controller, useForm, useWatch } from 'react-hook-form';
import slugify from 'slugify';
import { toast } from 'sonner';
import type z from 'zod';
import { createCourse } from './action';

const CreateCoursePage = () => {
  const [isPending, setUseTransition] = useTransition();
  const router = useRouter();
  const form = useForm<z.infer<typeof CREATE_COURSE_SCHEME>>({
    resolver: zodResolver(CREATE_COURSE_SCHEME),
    defaultValues: {
      category: 'Web Development',
      duration: '',
      fileKey: '',
      level: 'Beginner',
      price: '',
      slug: '',
      smallDescription: '',
      title: '',
      status: 'Draft',
    },
  });

  async function onSubmit(data: z.infer<typeof CREATE_COURSE_SCHEME>) {
    setUseTransition(async () => {
      const { data: result, error } = await tryCatch(createCourse(data));
      if (error) {
        toast.error('Failed to create course. Please try again.');
        return;
      }

      if (result?.status === 'success') {
        toast.success('Course created successfully!');
        ConfettiEffect();
        form.reset();
        setTimeout(() => {
          router.push('/admin/courses');
        }, 1000);
      } else if (result?.status === 'error') {
        toast.error(
          result.message || 'Failed to create course. Please try again.',
        );
      }
    });
  }

  const title = useWatch({
    control: form.control,
    name: 'title',
  });

  useEffect(() => {
    form.setValue(
      'slug',
      slugify(title ? title : '', { lower: true, strict: true }),
    );
  }, [title]);

  return (
    <>
      <div className="flex items-center gap-1 mb-4">
        <Button
          nativeButton={false}
          variant={'outline'}
          render={<Link href={'/admin/courses'} />}
        >
          <ArrowLeft size={4} />
        </Button>
        <h1 className="text-2xl font-bold">Create Course</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
          <CardDescription>
            Provide basic information about the course
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
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
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
                          const title = form.getValues('title');
                          const slug = slugify(title, {
                            lower: true,
                            strict: true,
                          });
                          form.setValue('slug', slug);
                        }}
                      >
                        <Stars size={16} />
                        Generate Slug
                      </Button>
                    </div>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                control={form.control}
                name="smallDescription"
                render={({ field, fieldState }) => (
                  <Field className="flex-1" data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="small-description">
                      Small Description
                    </FieldLabel>
                    <Textarea
                      rows={10}
                      {...field}
                      className="min-h-25 max-h-50"
                      id="small-description"
                      placeholder="Enter small description"
                      aria-invalid={fieldState.invalid}
                    />

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                control={form.control}
                name="description"
                render={({ field, fieldState }) => (
                  <Field className="flex-1" data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="description">Description</FieldLabel>
                    <RichTextEditor onChange={field.onChange} />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                control={form.control}
                name="fileKey"
                render={({ field, fieldState }) => (
                  <Field className="flex-1" data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="file-key">Thumbnail Image</FieldLabel>
                    <Uploader onChange={field.onChange} value={field.value} />

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
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
                      <SelectTrigger className={'py-5'}>
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

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
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
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger className={'py-5'}>
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

                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                <Controller
                  control={form.control}
                  name="level"
                  render={({ field, fieldState }) => (
                    <Field className="flex-1" data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="level">Level</FieldLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger className={'py-5'}>
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

                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                <Controller
                  control={form.control}
                  name="duration"
                  render={({ field, fieldState }) => (
                    <Field className="flex-1" data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="duration">
                        Duration (hours)
                      </FieldLabel>
                      <Input
                        {...field}
                        id="duration"
                        placeholder="Duration in hours"
                        aria-invalid={fieldState.invalid}
                        type="number"
                        min={0}
                      />

                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
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

                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </div>
            </FieldGroup>

            <Button
              disabled={isPending}
              type="submit"
              className="flex items-center gap-2 w-full"
            >
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
                  <span>Create Course</span>
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </>
  );
};

export default CreateCoursePage;
