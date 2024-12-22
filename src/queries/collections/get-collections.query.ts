import { SupabasePostgrestActionError } from "@/lib/errors/errors";
import type { Tables } from "@/types/database.types";
import { createClient } from "@/utils/supabase/server";

export type GetCollectionsInput = Pick<
  Tables<"collections">,
  "organization_id"
> & {
  query?: string;
};

export const getCollectionsQuery = async ({
  organization_id,
  query,
}: GetCollectionsInput) => {
  const supabase = await createClient();

  const sQuery = supabase
    .from("collections")
    .select()
    .eq("organization_id", organization_id);

  if (query && query.length > 0) {
    sQuery.ilike("name", `%${query}%`);
  }

  sQuery.order("created_at", { ascending: false });

  const { data, error } = await sQuery;

  if (error) {
    throw new SupabasePostgrestActionError(error);
  }

  return data;
};

type MediaWithDuration = Tables<"media"> &
  Pick<Tables<"collection_media">, "duration" | "display_order">;

export type GetCollectionOutput = Tables<"collections"> & {
  medias: MediaWithDuration[];
};

export const getCollectionWithMediasQuery = async ({
  id,
}: Pick<Tables<"collections">, "id">): Promise<
  Tables<"collection_with_medias_v">
> => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("collection_with_medias_v")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    throw new SupabasePostgrestActionError(error);
  }

  return data;
};
