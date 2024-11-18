import { getServerUrl } from "@/utils/server-url";
import { createClient } from "@/utils/supabase/server";
import type { EmailOtpType } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);

  const token_hash = requestUrl.searchParams.get("token_hash");
  const type = requestUrl.searchParams.get("type") as EmailOtpType | null;

  if (!token_hash || !type) {
    return NextResponse.error();
  }

  const supabase = await createClient();

  const { error } = await supabase.auth.verifyOtp({ token_hash, type });

  if (!error) {
    return NextResponse.redirect(`${getServerUrl()}/reset-password`);
  }

  //TODO: redirect to an error page
  return NextResponse.redirect(`${getServerUrl()}/login`);
}
