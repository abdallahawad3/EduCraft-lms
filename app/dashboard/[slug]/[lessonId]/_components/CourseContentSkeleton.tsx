import { Skeleton } from "@/components/ui/skeleton";

const CourseContentSkeleton = () => {
  return (
    <div className="flex flex-1 w-full flex-col h-full bg-background">
      {/* Video */}
      <div className="aspect-video w-full rounded-lg overflow-hidden">
        <Skeleton className="h-full w-full rounded-lg" />
      </div>

      {/* Complete button */}
      <div className="py-4 border-b">
        <Skeleton className="h-10 w-40 rounded-md" />
      </div>

      {/* Lesson content */}
      <div className="space-y-5 pt-6">
        {/* Title */}
        <Skeleton className="h-9 w-2/3 rounded-md" />

        {/* Description */}
        <div className="space-y-3">
          <Skeleton className="h-4 w-full rounded" />
          <Skeleton className="h-4 w-[95%] rounded" />
          <Skeleton className="h-4 w-[85%] rounded" />

          <div className="pt-3 space-y-3">
            <Skeleton className="h-4 w-[90%] rounded" />
            <Skeleton className="h-4 w-[75%] rounded" />
          </div>

          <div className="pt-3 space-y-3">
            <Skeleton className="h-4 w-full rounded" />
            <Skeleton className="h-4 w-[80%] rounded" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseContentSkeleton;
