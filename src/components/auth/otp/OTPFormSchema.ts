import { z } from "zod";

export const OTPFormSchema = z.object({
  otp: z.string().min(6, {
    message: "OTP must be 6 digits long.",
  }),
});
