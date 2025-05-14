import { supabase } from "@/lib/supabase";

export const checkAccountStatus = async (email: string) => {
  const { data: userData } = await supabase.auth.getUser();

  if (!userData?.user?.id) {
    throw new Error("No authenticated user found");
  }

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("*")
    .eq("email", email)
    .single();

  return { data: profile, error: profileError };
};
