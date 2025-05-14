import { z } from "zod";

export const LoginFormSchema = z.object({
  email: z.string().email({
    message: "You must enter a valid email address.",
  }),
});
