"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { cn } from "@/lib/utils";
import { EErrorMessage, getMessage, IStatusMessage } from "@/utils/messages";
import { zodResolver } from "@hookform/resolvers/zod";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { OTPFormSchema } from "@/components/auth/otp/OTPFormSchema";
import { verifyOtp } from "@/app/auth/actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { checkAccountStatus } from "@/app/(auth-pages)/login/checkAccountStatus";

interface OTPFormProps {
  email: string;
}

export function OTPForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div"> & OTPFormProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<IStatusMessage | undefined>();
  const router = useRouter();

  const form = useForm<z.infer<typeof OTPFormSchema>>({
    resolver: zodResolver(OTPFormSchema),
    defaultValues: {
      otp: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof OTPFormSchema>) => {
    setIsLoading(true);
    try {
      await verifyOtp(props.email, data.otp, "email");
      
      const { data: profile, error: profileError } = await checkAccountStatus(props.email);
      
      if (profileError?.code === "PGRST116") {
        router.push("/create-profile");
      } else if (profile) {
        router.push("/jobs");
      } else if (profileError) {
        throw new Error("Failed to check account status");
      }
    } catch (error) {
      console.error(error);
      setErrorMessage(getMessage(EErrorMessage.CANNOT_VERIFY_OTP));
      toast(errorMessage?.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Verification</h1>
        <p className="text-balance text-sm text-muted-foreground">
          Enter the one-time password sent to {props.email} to verify your
          identity.
        </p>
      </div>
      <div className="grid gap-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="otp"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>One-time Password</FormLabel>
                  <FormControl>
                    <InputOTP
                      maxLength={6}
                      pattern={REGEXP_ONLY_DIGITS}
                      {...field}
                    >
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button isLoading={isLoading} type="submit" className="w-full">
              {isLoading ? "Please wait..." : "Verify!"}
            </Button>
          </form>
        </Form>
        <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
          <span className="relative z-10 bg-background px-2 text-muted-foreground">
            Didn&apos;t receive a code? <a href="#">Resend</a> {/* TODO */}
          </span>
        </div>
      </div>
    </div>
  );
}
