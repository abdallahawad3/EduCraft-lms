import { getCourseBySlug } from '@/app/data/courses/get-course';
import RenderDescription from '@/components/rich-text-editor/RenderDescription';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Prisma } from '@/lib/generated/prisma/client';
import type { JSONContent } from '@tiptap/react';
import { ChartBarIcon, Play, TimerIcon } from 'lucide-react';
import Image from 'next/image';

interface IProps {
  params: Promise<{
    slug: string;
  }>;
}
export default async function CoursePage({ params }: IProps) {
  const { slug } = await params;
  const course = await getCourseBySlug(slug);

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 mt-5">
      <div className="order-1 lg:col-span-2">
        <div className="relative aspect-video w-full rounded-xl overflow-hidden shadow-lg group">
          <Image
            src={course.imageUrl}
            alt={course.title}
            fill
            className="object-cover w-full group-hover:scale-105 transition-transform duration-200 "
            priority={true}
          />
          <div className="absolute inset-0 bg-black/50">
            <Play className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white size-20 bg-black/80 rounded-full p-5 group-hover:bg-black/70 transition-colors duration-200" />
          </div>
        </div>
        <div className="mt-4 space-y-6">
          <div className="space-y-4">
            <h1 className="text-3xl lg:text-4xl font-bold tracking-tight">
              {course.title}
            </h1>
            <p className="text-muted-foreground leading-relaxed">
              {course.smallDescription}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Badge className="rounded-none p-4 text-lg font-medium">
              <ChartBarIcon />
              <span className="ml-0">{course.level}</span>
            </Badge>
            <Badge className="rounded-none p-4 text-lg font-medium">
              <Play />
              <span className="ml-0">{course.category}</span>
            </Badge>
            <Badge className="rounded-none p-4 text-lg font-medium">
              <TimerIcon />
              <span className="ml-0">{course.duration} h</span>
            </Badge>
          </div>
        </div>
        <Separator className="my-6" />
        <div className="space-y-6">
          <h2 className="text-3xl font-semibold tracking-tight">
            Course Description
          </h2>
          <RenderDescription
            description={course.description as Prisma.JsonObject as JSONContent}
          />
        </div>
        <Separator className="my-6" />
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-semibold tracking-tight">
              Course Lessons
            </h2>
            <span className="text-muted-foreground">
              {course.chapters.length} Chapters |{' '}
              {course.chapters.reduce(
                (acc, chapter) => acc + chapter.lessons.length,
                0,
              ) || 0}
              Lessons
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
