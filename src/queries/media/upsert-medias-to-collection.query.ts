import { SupabasePostgrestActionError } from "@/lib/errors/errors";
import type { Tables, TablesInsert } from "@/types/database.types";
import { createClient } from "@/utils/supabase/server";

export type UpsertMediasToCollectionInput = {
  collectionId: Tables<"collections">["id"];
  medias: Omit<TablesInsert<"collection_media">, "collection_id">[];
};

export const upsertMediasToCollectionQuery = async ({
  collectionId,
  medias,
}: UpsertMediasToCollectionInput): Promise<Tables<"collection_media">[]> => {
  const supabase = await createClient();

  const collectionMedias = medias.map((media) => ({
    collection_id: collectionId,
    ...media,
  }));

  const { data, error } = await supabase
    .from("collection_media")
    .upsert(collectionMedias)
    .select();

  if (error) {
    throw new SupabasePostgrestActionError(error);
  }

  return data;
};
