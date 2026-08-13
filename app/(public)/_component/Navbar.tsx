"use client";
import { ModeToggle } from "@/components/theme/mode-toggle";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import Link from "next/link";
import { DropdownMenuAvatar } from "./UserLinks";
import { buttonVariants } from "@/components/ui/button";
import { GraduationCap } from "lucide-react";

const NAVIGATION_LINKS = [
  { name: "Courses", href: "/courses" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

const Navbar = () => {
  const { isPending, data } = authClient.useSession();
  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-[backdrop-filter]:bg-background/60 bg-background/90 border-b">
      <div className="container  mx-auto px-5 md:px-20 flex items-center min-h-16">
        <Link href="/" className="flex items-center space-x-2">
          <div className=" flex size-10 items-center justify-center rounded-xl">
            <GraduationCap className="size-7 text-primary" />
          </div>
          AbdullahLMS.
        </Link>
        {/* Desktop Navigation */}
        <nav className="hidden md:flex md:flex-1 ml-4 items-center space-x-4">
          {NAVIGATION_LINKS.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.name}
            </Link>
          ))}
          <div className="ml-auto flex items-center space-x-2">
            <ModeToggle />
            {isPending ? (
              <div className="w-8 h-8 rounded-full bg-muted animate-pulse" />
            ) : data?.user ? (
              <DropdownMenuAvatar />
            ) : (
              <div className="flex items-center space-x-2">
                <Link href="/login" className={buttonVariants({ size: "lg", variant: "outline" })}>
                  Login
                </Link>
                <Link href="/login" className={buttonVariants({ size: "lg" })}>
                  Get Started
                </Link>
              </div>
            )}
          </div>
        </nav>
        {/* Mobile Navigation */}
      </div>
    </header>
  );
};

export default Navbar;
