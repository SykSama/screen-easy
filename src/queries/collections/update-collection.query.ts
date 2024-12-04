import { SupabasePostgrestActionError } from "@/lib/errors/errors";
import type { Tables, TablesUpdate } from "@/types/database.types";
import { createClient } from "@/utils/supabase/server";

export const updateCollectionQuery = async (
  id: string,
  collection: TablesUpdate<"collections">,
): Promise<Tables<"collections">> => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("collections")
    .update(collection)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    throw new SupabasePostgrestActionError(error);
  }

  return data;
};
