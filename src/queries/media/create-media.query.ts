import { SupabasePostgrestActionError } from "@/lib/errors/errors";
import type { Tables, TablesInsert } from "@/types/database.types";
import { createClient } from "@/utils/supabase/server";

export const createMediaQuery = async (
  media: TablesInsert<"media">,
): Promise<Tables<"media">> => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("media")
    .insert(media)
    .select()
    .single();

  if (error) {
    throw new SupabasePostgrestActionError(error);
  }

  return data;
};
