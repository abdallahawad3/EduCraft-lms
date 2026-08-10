"use client";

import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ColumnsSettingsIcon,
  LucideSplitSquareHorizontal,
  TvMinimalIcon,
  UsersIcon,
} from "lucide-react";

export function SectionCards() {
  return (
    <div className="grid grid-cols-1 gap-4 *:data-[slot=card]:bg-linear-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs @xl/main:grid-cols-2 @5xl/main:grid-cols-4 dark:*:data-[slot=card]:bg-card">
      <Card className="@container/card">
        <CardHeader className="flex items-center justify-between">
          <div>
            <CardDescription>Total Signup</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              2500
            </CardTitle>
          </div>
          <ColumnsSettingsIcon />
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <p className="text-muted-foreground">Registered users in this platform</p>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader className="flex items-center justify-between">
          <div>
            <CardDescription>Total Customers</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              1200
            </CardTitle>
          </div>
          <UsersIcon />
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <p className="text-muted-foreground">Users have enrollment in courses</p>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader className="flex items-center justify-between">
          <div>
            <CardDescription>Total Courses</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              100
            </CardTitle>
          </div>

          <TvMinimalIcon />
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <p className="text-muted-foreground">Available Courses on platform</p>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader className="flex items-center justify-between">
          <div>
            <CardDescription>Total Lessons</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              10000
            </CardTitle>
          </div>
          <LucideSplitSquareHorizontal />
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <p className="text-muted-foreground">Total learning lessons</p>
        </CardFooter>
      </Card>
    </div>
  );
}
