import { Button } from "@/components/ui/button";
import Link from "next/link";

const page = () => {
  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-medium tracking-tight">Your Courses</h1>
        <Button render={<Link href={"/admin/courses/create"} />}>
          <span className="text-sm font-medium">Create Course</span>
        </Button>
      </div>

      <div>
        <p className="text-muted-foreground">Here you will find all your courses.</p>
      </div>
    </>
  );
};

export default page;
