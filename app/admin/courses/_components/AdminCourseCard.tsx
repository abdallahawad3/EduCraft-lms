"use client";

import { AdminCourseType } from "@/actions/admin/get-admin-data";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ArrowRightIcon,
  Eye,
  MoreVertical,
  PencilIcon,
  School,
  TimerIcon,
  Trash2,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { deleteCourse } from "../delete/action";
import { toast } from "sonner";

interface IProps {
  course: AdminCourseType[0];
}

const AdminCourseCard = ({ course }: IProps) => {
  return (
    <Card className="group relative py-0 gap-0">
      {/* Absolute Drop down */}
      <div className="absolute top-2 right-2 z-10">
        <DropdownMenu>
          <DropdownMenuTrigger
            suppressHydrationWarning
            render={
              <Button className={"bg-white/90 py-4! hover:bg-white/80"} size={"icon"}>
                <MoreVertical size={4} className="text-black" />
              </Button>
            }
          />

          <DropdownMenuContent align="end" className={"w-48"}>
            <DropdownMenuItem>
              <Link className={"flex items-center"} href={`/admin/courses/${course.id}/edit`}>
                <PencilIcon className="size-4 mr-2" />
                Edit Course
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link className={"flex items-center"} href={`/admin/courses/${course.slug}`}>
                <Eye className="size-4 mr-2" />
                Preview
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={async () => {
                const { status } = await deleteCourse(course.id);

                if (status === "success") {
                  toast.success("The course deleted successfully");
                }
              }}
              variant="destructive"
            >
              <Trash2 className="size-4 mr-2" />
              Delete Course
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <Image
        loading="eager"
        src={course.imageUrl}
        alt={course.title}
        width={600}
        height={400}
        className="w-full rounded-t-lg aspect-video"
      />

      <CardContent className="p-4">
        <Link
          href={`/admin/courses/${course.id}`}
          className="font-medium text-lg line-clamp-2 hover:underline group-hover:text-primary transition-colors"
        >
          {course.title}
        </Link>
        <p className="line-clamp-2 text-sm text-muted-foreground leading-tight mt-2">
          {course.smallDescription}
        </p>
        <div className="mt-4 flex items-center gap-x-5">
          <div className="flex items-center">
            <TimerIcon className="size-6 p-1 rounded-md text-primary bg-primary/10" />
            <p className="text-sm gap-2">{course.duration}h</p>
          </div>
          <div className="flex items-center">
            <School className="size-6 p-1 rounded-md text-primary bg-primary/10" />
            <p className="text-sm gap-2">{course.level}</p>
          </div>
        </div>
        <Link
          href={`/admin/courses/${course.id}/edit`}
          className={buttonVariants({
            className: "w-full mt-4",
          })}
        >
          Edit Course
          <ArrowRightIcon />
        </Link>
      </CardContent>
    </Card>
  );
};

export default AdminCourseCard;
