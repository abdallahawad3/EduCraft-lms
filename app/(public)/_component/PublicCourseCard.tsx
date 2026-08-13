import { PublicCourse } from "@/app/data/courses/get-courses";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { School2Icon, TimerIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface PublicCourseCardProps {
  data: PublicCourse;
  courseUrl?: string;
}

const PublicCourseCard = ({ data, courseUrl }: PublicCourseCardProps) => {
  return (
    <Card className="relative group py-0 gap-0">
      <Badge
        className={cn(
          "absolute top-2 right-2",
          data.level === "Beginner"
            ? "bg-green-500"
            : data.level === "Intermediate"
              ? "bg-yellow-500"
              : "bg-red-500",
        )}
      >
        {data.level}
      </Badge>

      <Image
        src={data.imageUrl}
        className="bg-contain rounded-t-xl w-full aspect-video object-cover"
        alt={data.title}
        width={400}
        height={600}
      />

      <CardContent className="p-4">
        <Link
          href={courseUrl ? `/dashboard/${courseUrl}` : `/courses/${data.slug}`}
          className="no-underline "
        >
          <h3 className="font-medium text-lg line-clamp-2 hover:underline group-hover:text-primary transition-colors">
            {data.title}
          </h3>
        </Link>
        <p className="text-sm text-muted-foreground mt-2 line-clamp-3 tracking-tight">
          {data.smallDescription}
        </p>
        <div className="flex items-center gap-2 mt-4">
          <div className="flex items-center gap-1">
            <TimerIcon className="size-6 p-1 inline-block bg-primary/10 text-primary" />
            <span className="text-sm text-muted-foreground">{data.duration}h</span>
          </div>
          <Separator orientation="vertical" />
          <div className="flex items-center gap-1">
            <School2Icon className="size-6 p-1 inline-block bg-primary/10 text-primary" />
            <span className="text-sm text-muted-foreground">{data.category}</span>
          </div>
        </div>

        <Link
          href={courseUrl ? `/dashboard/${courseUrl}` : `/courses/${data.slug}`}
          className={buttonVariants({
            variant: "default",
            className: "mt-4 w-full",
          })}
        >
          {courseUrl ? "Continue Learning" : "Learn More.!"}
        </Link>
      </CardContent>
    </Card>
  );
};

export default PublicCourseCard;
export const PublicCourseSkeleton = () => {
  return (
    <Card className="relative group py-0 gap-0">
      <div className="absolute top-2 right-2 z-10">
        <Skeleton className="h-6 w-20 rounded-full" />
      </div>
      <div className="h-fit relative w-full">
        <Skeleton className="h-48 w-full rounded-t-xl aspect-video" />
      </div>

      <CardContent className="p-4">
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/2" />
        </div>

        <div className="mt-4 flex items-center gap-1">
          <div className="flex items-center gap-2">
            <Skeleton className="size-4 rounded-md" />
            <Skeleton className="h-4 w--8" />
          </div>
          <Separator orientation="vertical" />
          <div className="flex items-center gap-2">
            <Skeleton className="size-4 rounded-md" />
            <Skeleton className="h-4 w--8" />
          </div>
        </div>

        <Skeleton className="h-10 rounded-md w-full mt-4" />
      </CardContent>
    </Card>
  );
};
