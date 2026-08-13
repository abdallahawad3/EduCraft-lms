'use client';
import type { adminGetCourse } from '@/actions/admin/get-course-data';
import Uploader from '@/components/file-uploader/Uploader';
import RichTextEditor from '@/components/rich-text-editor/Editor';
import { Button } from '@/components/ui/button';
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
import {
  courseCategory,
  courseLevel,
  CourseStatus,
  CREATE_COURSE_SCHEME,
} from '@/lib/validation/create-course';
import { zodResolver } from '@hookform/resolvers/zod';
import type { JSONContent } from '@tiptap/react';
import { PlusIcon, Stars } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { Controller, useForm } from 'react-hook-form';
import slugify from 'slugify';
import { toast } from 'sonner';
import z from 'zod';
import { updateCourse } from '../action';

type CourseEditData = Awaited<ReturnType<typeof adminGetCourse>>;

const EditCourseForm = ({
  data,
  id,
  imageUrl,
}: {
  data: CourseEditData;
  id: string;
  imageUrl: string;
}) => {
  const [isPending, setUseTransition] = useTransition();
  const router = useRouter();
  const form = useForm<z.infer<typeof CREATE_COURSE_SCHEME>>({
    resolver: zodResolver(CREATE_COURSE_SCHEME),
    defaultValues: {
      category: data.category,
      description: data.description,
      duration: data.duration.toString(),
      fileKey: data.fileKey,
      level: data.level,
      price: data.price.toString(),
      slug: data.slug,
      smallDescription: data.smallDescription,
      title: data.title,
      status: data.status,
    },
  });

  function onSubmit(data: z.infer<typeof CREATE_COURSE_SCHEME>) {
    setUseTransition(async () => {
      const { status } = await updateCourse(data, id);
      if (status === 'error') {
        toast.error('Failed to update course data');
        return;
      }

      toast.success('Course update successfully', { position: 'top-right' });
      form.reset();
      router.push('/admin/courses');
    });
  }

  function generateSlug() {
    if (!form.getValues('title')) {
      toast.error('Enter title to generate slug');
      return;
    }
    const slug = slugify(form.getValues('title'), { lower: true });
    form.setValue('slug', slug);
  }
  return (
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
                  className=""
                  {...field}
                  id="slug"
                  placeholder="slug"
                  aria-invalid={fieldState.invalid}
                />
                <Button className="cursor-not-allowed" onClick={generateSlug}>
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
              <RichTextEditor
                content={data.description as JSONContent}
                onChange={field.onChange}
              />
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
              <Uploader
                imageUrl={imageUrl}
                onChange={field.onChange}
                value={field.value}
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
                <Select onValueChange={field.onChange} value={field.value}>
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
                <FieldLabel htmlFor="duration">Duration (hours)</FieldLabel>
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
  );
};

export default EditCourseForm;
