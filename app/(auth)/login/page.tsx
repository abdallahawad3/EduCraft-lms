import { LoginForm } from "@/components/forms/login-form";

export default async function LoginPage() {
  return (
    <div className="w-full max-w-sm md:max-w-md border p-4 pb-6 rounded-lg bg-card shadow-lg">
      <LoginForm />
    </div>
  );
}
