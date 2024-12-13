import { SupabasePostgrestActionError } from "@/lib/errors/errors";
import type { Tables } from "@/types";

import { createClient } from "@/utils/supabase/client";

export const getMediasQueryClient = async (
  search?: string,
): Promise<Tables<"media">[]> => {
  const supabase = createClient();

  let query = supabase.from("media").select("*");

  if (search) {
    query = query.ilike("name", `%${search}%`);
  }

  const { data, error } = await query;

  if (error) {
    throw new SupabasePostgrestActionError(error);
  }

  return data;
};
