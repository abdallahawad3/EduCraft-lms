"use client";
import { ModeToggle } from "@/components/mode-toggle";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import Link from "next/link";
import { DropdownMenuAvatar } from "./UserLinks";

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
          <Image
            src="/images/logo.webp"
            alt="Logo"
            width={40}
            height={40}
            className="inline-block ml-2"
          />
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
              <Link
                href="/login"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Login
              </Link>
            )}
          </div>
        </nav>
        {/* Mobile Navigation */}
      </div>
    </header>
  );
};

export default Navbar;
