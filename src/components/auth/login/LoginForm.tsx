"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Github } from "lucide-react";
import { useState } from "react";
import { EErrorMessage, getMessage, IStatusMessage } from "@/utils/messages";
import { LoginFormSchema } from "@/components/auth/login/LoginFormSchema";
import { login } from "@/app/auth/actions";
import { toast } from "sonner";

interface LoginFormProps extends React.ComponentPropsWithoutRef<"div"> {
  onOtpSent?: (email: string) => void;
}

export function LoginForm({ className, onOtpSent, ...props }: LoginFormProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<
    IStatusMessage | undefined
  >();

  const form = useForm<z.infer<typeof LoginFormSchema>>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      email: "",
    },
  });

  const handleSubmit = async (data: z.infer<typeof LoginFormSchema>) => {
    setIsLoading(true);
    try {
      await login(data.email);
      onOtpSent?.(data.email);
    } catch (error) {
      console.error(error);
      setErrorMessage(getMessage(EErrorMessage.CANNOT_VERIFY_EMAIL));
      toast(errorMessage?.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Login</h1>
        <p className="text-balance text-sm text-muted-foreground">
          Enter your email below to login to your account.
        </p>
      </div>
      <div className="grid gap-6">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="john.smith@click.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" isLoading={isLoading}>
              {isLoading ? "Please wait..." : "Continue"}
            </Button>
          </form>
        </Form>
        <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
          <span className="relative z-10 bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
        <Button variant="outline" className="w-full">
          <Github className="mr-2 h-4 w-4" />
          Login with GitHub
        </Button>
      </div>
      <div className="text-center text-sm">
        By creating an account, you agree to Click's{" "}
        <a href="#" className="underline underline-offset-4">
          terms and conditions
        </a>
        .{/*TODO*/}
      </div>
    </div>
  );
}
