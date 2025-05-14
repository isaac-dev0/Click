"use server";

import { createClient } from "@/utils/supabase/server";
import { EmailOtpType } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { checkAccountStatus } from "../(auth-pages)/login/checkAccountStatus";

export async function login(email: string) {
  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithOtp({
    email: email,
    options: { shouldCreateUser: true },
  });

  if (error) console.log(error);
}

export async function verifyOtp(
  email: string,
  token: string,
  type: EmailOtpType
) {
  const supabase = await createClient();
  await supabase.auth.verifyOtp({ email: email, token: token, type: type });

  revalidatePath("/", "layout");

  const accountStatus = checkAccountStatus(email)
  
  if (!accountStatus) {
    redirect("/jobs");
  } else {
    redirect("/create-profile")
  }
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  return redirect("/login");
}
