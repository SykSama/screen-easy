import { SupabasePostgrestActionError } from "@/lib/errors/errors";
import type { Tables } from "@/types/database.types";
import { createClient } from "@/utils/supabase/server";

export type GetMediaOutput = Tables<"media"> & {
  collections: Pick<Tables<"collections">, "id" | "name" | "description">[];
};

export const getMediaQuery = async (id: string): Promise<GetMediaOutput> => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("media")
    .select("*, collections( id, name, description )")
    .eq("id", id)
    .single();

  if (error) {
    throw new SupabasePostgrestActionError(error);
  }

  return data;
};
