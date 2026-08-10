import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { cache } from "react";
export const requiredAdmin = cache(async () => {
  const userSession = await auth.api.getSession({
    headers: await headers(),
  });

  if (!userSession) {
    redirect("/login");
  }

  if (userSession.user.role !== "admin") {
    return redirect("/not-admin");
  }

  return userSession;
});
