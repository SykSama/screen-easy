import { SupabasePostgrestActionError } from "@/lib/errors/errors";
import type { Tables, TablesInsert } from "@/types/database.types";
import { createClient } from "@/utils/supabase/server";

export const upsertCollectionQuery = async (
  collection: TablesInsert<"collections">,
): Promise<Tables<"collections">> => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("collections")
    .upsert(collection)
    .select()
    .single();

  if (error) {
    throw new SupabasePostgrestActionError(error);
  }

  return data;
};
