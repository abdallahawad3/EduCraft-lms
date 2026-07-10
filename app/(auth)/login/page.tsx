import { LoginForm } from "@/components/forms/login-form";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (session) {
    redirect("/");
  }
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
      <div className="flex flex-col items-center gap-2 text-center">
        <Link href="/" className="flex items-center gap-1">
          <Image src="/images/logo.webp" alt="Logo" width={70} height={70} />
          <span className="sr-only">AbdullahLMS.</span>
          <p className="font-bold -ml-2">Welcome to LMS.</p>
        </Link>
      </div>
      <div className="w-full max-w-sm md:max-w-md border p-4 pb-6 rounded-lg bg-card shadow-lg">
        <LoginForm />
      </div>
    </div>
  );
}
