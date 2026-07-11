"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useSignOut } from "@/hooks/use-signout";
import { authClient } from "@/lib/auth-client";
import {
  EllipsisVerticalIcon,
  LogOutIcon,
  LayoutDashboardIcon,
  HomeIcon,
  LibraryBigIcon,
} from "lucide-react";
import Link from "next/link";

export function NavUser() {
  const { signOut } = useSignOut();
  const { isPending, data } = authClient.useSession();
  const { isMobile } = useSidebar();

  if (isPending) {
    return null;
  }
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger
            render={<SidebarMenuButton size="lg" className="aria-expanded:bg-muted" />}
          >
            <Avatar className="size-8 rounded-md">
              <AvatarImage
                src={data?.user?.image || "https://github.com/shadcn.png"}
                alt={data?.user?.name}
              />
              <AvatarFallback className="rounded-lg">CN</AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-medium">{data?.user?.name}</span>
              <span className="truncate text-xs text-foreground/70">{data?.user?.email}</span>
            </div>
            <EllipsisVerticalIcon className="ml-auto size-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="min-w-56"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuGroup>
              <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                  <Avatar className="size-8">
                    <AvatarImage
                      className="rounded-lg"
                      src={data?.user?.image || "https://github.com/shadcn.png"}
                      alt={data?.user?.name}
                    />
                    <AvatarFallback className="rounded-lg">
                      {data?.user?.name
                        ?.split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-medium">
                      {data?.user?.name ? data?.user?.name : data?.user?.email.split("@")[0]}
                    </span>
                    <span className="truncate text-xs text-muted-foreground">
                      {data?.user?.email}
                    </span>
                  </div>
                </div>
              </DropdownMenuLabel>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem render={<Link href={"/admin"} />}>
                <LayoutDashboardIcon />
                Dashboard
              </DropdownMenuItem>
              <DropdownMenuItem render={<Link href={"/"} />}>
                <HomeIcon />
                Home
              </DropdownMenuItem>
              <DropdownMenuItem render={<Link href={"/admin/courses"} />}>
                <LibraryBigIcon />
                Courses
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={signOut}>
              <LogOutIcon />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
