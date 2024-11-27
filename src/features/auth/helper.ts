import type { Database } from "@/types/database.types";
import { createClient } from "@/utils/supabase/server";
import type { SupabaseClient, User } from "@supabase/supabase-js";

export class AuthError extends Error {}

export const auth = async (): Promise<{
  user: User | null;
  supabase: SupabaseClient<Database>;
}> => {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return { user, supabase };
};

export const requiredAuth = async (): Promise<{
  user: User;
  supabase: SupabaseClient<Database>;
}> => {
  const { user, supabase } = await auth();

  if (!user) {
    throw new AuthError("You must be authenticated to access this resource.");
  }

  return { user, supabase };
};
