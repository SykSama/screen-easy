import { env } from "@/lib/env";
import type { Database } from "@/types/database.generated.types";
import { createBrowserClient } from "@supabase/ssr";

export const createClient = () =>
  createBrowserClient<Database>(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  );
