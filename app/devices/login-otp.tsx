"use server";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export const loginOtp = async (otpCode: string, email: string) => {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.verifyOtp({
    type: "email",
    token: otpCode,
    email,
  });

  if (error) {
    throw new Error(error.message);
  }

  redirect("/devices/logged");
};
