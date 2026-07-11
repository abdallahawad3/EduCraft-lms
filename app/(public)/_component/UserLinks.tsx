"use client";

import { HomeIcon, LayoutDashboardIcon, LogOutIcon, PencilIcon, User } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function DropdownMenuAvatar() {
  const { data } = authClient.useSession();
  const router = useRouter();
  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.success("Signed out successfully!", {
            position: "top-right",
          });
          setTimeout(() => {
            router.push("/login");
          }, 1000);
        },
        onError: (error) => {
          console.error("Sign out failed:", error);
          toast.error("Sign out failed!", {
            position: "top-right",
          });
        },
      },
    });
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button variant="ghost" size="icon" className="rounded-full">
            <Avatar>
              <AvatarImage
                src={data?.user?.image || "https://github.com/shadcn.png"}
                alt={data?.user?.name || "shadcn"}
              />
              <AvatarFallback>{data?.user?.name ? data.user.name.charAt(0) : "LR"}</AvatarFallback>
            </Avatar>
          </Button>
        }
      />
      <DropdownMenuContent className="w-56" align="end">
        <DropdownMenuGroup>
          <DropdownMenuItem className="flex items-center space-x-2 py-3 cursor-auto hover:bg-transparent! hover:text-foreground!">
            <div className="flex flex-col">
              <span className="text-sm font-medium leading-none">{data?.user?.name}</span>
              <span className="text-xs leading-none text-muted-foreground">
                {data?.user?.email}
              </span>
            </div>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <Link href="/">
            <DropdownMenuItem>
              <HomeIcon />
              Home
            </DropdownMenuItem>
          </Link>
          <Link href="/profile">
            <DropdownMenuItem>
              <User />
              Profile
            </DropdownMenuItem>
          </Link>
          <Link href="/courses">
            <DropdownMenuItem>
              <PencilIcon />
              Courses
            </DropdownMenuItem>
          </Link>
          <Link href="/dashboard">
            <DropdownMenuItem>
              <LayoutDashboardIcon />
              Dashboard
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleSignOut}>
          <LogOutIcon />
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
