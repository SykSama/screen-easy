import { SupabasePostgrestActionError } from "@/lib/errors/errors";
import type { TablesInsert } from "@/types/database.types";
import { createClient } from "@/utils/supabase/server";

type CreateMediaCollectionsInput = {
  media_id: string;
  collection_ids: string[];
};

export const createMediaCollectionsQuery = async ({
  media_id,
  collection_ids,
}: CreateMediaCollectionsInput) => {
  const supabase = await createClient();

  const mediaCollections: TablesInsert<"collection_media">[] =
    collection_ids.map((collection_id) => ({
      media_id,
      collection_id,
    }));

  const { error } = await supabase
    .from("collection_media")
    .insert(mediaCollections);

  if (error) {
    throw new SupabasePostgrestActionError(error);
  }
};
