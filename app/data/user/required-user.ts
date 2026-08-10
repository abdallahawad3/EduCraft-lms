import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { cache } from "react";

export const requiredUser = cache(async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  console.log(session);

  if (!session) {
    redirect("/login");
  }

  return session.user;
});
