"use client";

import { RefreshCwIcon } from "lucide-react";
import { useParams, useRouter, useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldLabel } from "@/components/ui/field";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";

export default function VerifyOTPPage() {
  const params = useSearchParams();
  const email = params.get("email");
  const router = useRouter();
  const [otp, setOtp] = useState("");
  const submitOtp = async () => {
    if (!email) return;
    if (otp.length !== 6) {
      alert("Please enter a valid 6-digit OTP.");
      return;
    }
    await authClient.signIn.emailOtp({
      email: email!,
      otp: otp,
      fetchOptions: {
        onSuccess: () => {
          router.push("/");
          toast.success("Login successful!", {
            position: "top-right",
          });
        },
        onError: () => {
          toast.error("Login failed!", {
            position: "top-right",
          });
        },
      },
    });
  };
  return (
    <Card className="max-w-sm md:max-w-md w-full">
      <CardHeader>
        <CardTitle>Verify your login</CardTitle>
        <CardDescription>
          Enter the verification code we sent to your email address:{" "}
          <span className="font-medium">{email}</span>.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Field>
          <div className="flex items-center justify-between">
            <FieldLabel htmlFor="otp-verification">Verification code</FieldLabel>
            <Button variant="outline" size="xs">
              <RefreshCwIcon />
              Resend Code
            </Button>
          </div>
          <InputOTP
            className="flex! justify-center! w-full!"
            maxLength={6}
            id="otp-verification"
            required
            value={otp}
            onChange={(e) => setOtp(e.valueOf())}
          >
            <InputOTPGroup className=" *:data-[slot=input-otp-slot]:h-12 *:data-[slot=input-otp-slot]:w-11 *:data-[slot=input-otp-slot]:text-xl">
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
            </InputOTPGroup>
            <InputOTPSeparator className="mx-2" />
            <InputOTPGroup className=" *:data-[slot=input-otp-slot]:h-12 *:data-[slot=input-otp-slot]:w-11 *:data-[slot=input-otp-slot]:text-xl">
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
        </Field>
      </CardContent>
      <CardFooter>
        <Field>
          <Button onClick={submitOtp} type="submit" className="w-full">
            Verify
          </Button>
        </Field>
      </CardFooter>
    </Card>
  );
}
