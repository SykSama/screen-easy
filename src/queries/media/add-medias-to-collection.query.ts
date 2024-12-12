import { SupabasePostgrestActionError } from "@/lib/errors/errors";
import type { Tables, TablesInsert } from "@/types/database.types";
import { createClient } from "@/utils/supabase/server";

export type AddMediasToCollectionInput = {
  collectionId: Tables<"collections">["id"];
  medias: Omit<TablesInsert<"collection_media">, "collection_id">[];
};

export const addMediasToCollectionQuery = async ({
  collectionId,
  medias,
}: AddMediasToCollectionInput): Promise<Tables<"collection_media">[]> => {
  const supabase = await createClient();

  const collectionMedias = medias.map((media) => ({
    collection_id: collectionId,
    ...media,
  }));

  const { data, error } = await supabase
    .from("collection_media")
    .insert(collectionMedias)
    .select();

  if (error) {
    throw new SupabasePostgrestActionError(error);
  }

  return data;
};
