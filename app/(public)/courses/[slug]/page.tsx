import { getCourseBySlug } from '@/app/data/courses/get-course';
import RenderDescription from '@/components/rich-text-editor/RenderDescription';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Prisma } from '@/lib/generated/prisma/client';
import type { JSONContent } from '@tiptap/react';
import {
  ChartBarIcon,
  ChartBarStacked,
  ChartColumnStackedIcon,
  CheckIcon,
  ClockIcon,
  LucideInfo,
  Play,
  TimerIcon,
} from 'lucide-react';
import Image from 'next/image';
import { CollapsibleChapters } from '../../_component/CollapsibleChapter';

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
          <div className="space-y-4">
            {course.chapters.map((chapter, key) => (
              <CollapsibleChapters
                idx={key}
                key={chapter.id}
                chapter={chapter}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="order-2 lg:col-span-1">
        <div className="sticky top-20">
          <Card className="py-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <span className="text-xl font-medium">Price</span>
                <span className="text-2xl font-bold text-primary">
                  {new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'USD',
                  }).format(course.price)}
                </span>
              </div>
              <div className="mt-6 space-y-3 rounded-lg bg-muted p-4">
                <h4 className="text-lg font-medium mt-6 mb-2">
                  What you will learn:
                </h4>
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    <div className="size-9 p-1 bg-primary/10 flex items-center justify-center text-primary/90 rounded-full border-primary/20">
                      <ClockIcon />
                    </div>
                    <div>
                      <span className="text-xl text-muted-foreground">
                        Course Duration
                      </span>
                      <p className="text-lg font-medium text-muted-foreground">
                        {course.duration} h
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    <div className="size-9 p-1 bg-primary/10 flex items-center justify-center text-primary/90 rounded-full border-primary/20">
                      <ChartBarStacked />
                    </div>
                    <div>
                      <span className="text-xl text-muted-foreground">
                        Difficulty Level
                      </span>
                      <p className="text-lg font-medium text-muted-foreground">
                        {course.level}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    <div className="size-9 p-1 bg-primary/10 flex items-center justify-center text-primary/90 rounded-full border-primary/20">
                      <LucideInfo />
                    </div>
                    <div>
                      <span className="text-xl text-muted-foreground">
                        Category
                      </span>
                      <p className="text-lg font-medium text-muted-foreground">
                        {course.category}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    <div className="size-9 p-1 bg-primary/10 flex items-center justify-center text-primary/90 rounded-full border-primary/20">
                      <ChartColumnStackedIcon />
                    </div>
                    <div>
                      <span className="text-xl text-muted-foreground">
                        Lessons Count
                      </span>
                      <p className="text-lg font-medium text-muted-foreground">
                        {course.chapters.reduce(
                          (total, chapter) => total + chapter.lessons.length,
                          0,
                        )}{' '}
                        Lessons
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mb-6 space-y-3">
                <h4 className="text-lg font-medium mt-6 mb-2">
                  This course includes:
                </h4>
                <ul className="list-disc list-inside space-y-1">
                  <li className="flex items-center gap-2">
                    <div className="size-5  p-1 bg-primary/10 flex items-center justify-center text-primary/90 rounded-full border-primary/20">
                      <CheckIcon className="" />
                    </div>
                    Lifetime access
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="size-5  p-1 bg-primary/10 flex items-center justify-center text-primary/90 rounded-full border-primary/20">
                      <CheckIcon className="" />
                    </div>
                    Mobile and TV access
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="size-5  p-1 bg-primary/10 flex items-center justify-center text-primary/90 rounded-full border-primary/20">
                      <CheckIcon className="" />
                    </div>
                    Certificate of completion
                  </li>
                </ul>
              </div>
              <Button className={'w-full'}>Enroll Now!</Button>
              <p className="text-xs text-center text-muted-foreground mt-3">
                30 Days Money Back Guarantee
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
