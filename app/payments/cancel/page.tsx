import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, XIcon } from "lucide-react";
import Link from "next/link";

const page = () => {
  return (
    <div className="w-full min-h-screen flex flex-1 justify-center items-center">
      <Card className="w-87.5">
        <CardContent>
          <div className="w-full flex justify-center">
            <XIcon className="size-12 bg-red-500/30  p-2 text-red-500 rounded-full" />
          </div>
          <div className="mt-3 text-center md:mt-5 w-full">
            <h2 className="text-xl text-center font-semibold">Payment Canceled</h2>
            <p className="text-sm mt-2 text-muted-foreground tracking-tight text-balance">
              No worries, you wont be charge. Please try again!
            </p>

            <Link className={buttonVariants({ className: "w-full mt-5" })} href={"/"}>
              <ArrowLeft className="size-4" />
              Go Back to home page
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default page;
