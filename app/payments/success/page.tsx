/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ConfettiEffect } from "@/utils/confetti";
import { ArrowLeft, CheckIcon } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

const page = () => {
  useEffect(() => {
    ConfettiEffect();
  }, []);
  return (
    <div className="w-full min-h-screen flex flex-1 justify-center items-center">
      <Card className="w-87.5">
        <CardContent>
          <div className="w-full flex justify-center">
            <CheckIcon className="size-12 bg-green-500/30  p-2 text-green-500 rounded-full" />
          </div>
          <div className="mt-3 text-center md:mt-5 w-full">
            <h2 className="text-xl text-center font-semibold">Payment Successful</h2>
            <p className="text-sm mt-2 text-muted-foreground tracking-tight text-balance">
              Congrats your payments was successful you should now access to the course
            </p>

            <Link className={buttonVariants({ className: "w-full mt-5" })} href={"/dashboard"}>
              <ArrowLeft className="size-4" />
              Go to dashboard
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default page;
