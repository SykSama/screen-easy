import { SupabasePostgrestActionError } from "@/lib/errors/errors";
import { createClient } from "@/utils/supabase/server";

type DeleteMediasFromCollectionInput = {
  collectionId: string;
  mediasToNotDeleteIds: string[];
};

export const deleteMediasFromCollectionQuery = async ({
  collectionId,
  mediasToNotDeleteIds,
}: DeleteMediasFromCollectionInput) => {
  if (mediasToNotDeleteIds.length === 0) {
    return [];
  }

  const supabase = await createClient();

  const mediaIds = `(${mediasToNotDeleteIds.join(",")})`;

  const { data, error } = await supabase
    .from("collection_media")
    .delete()
    .eq("collection_id", collectionId)
    .not("media_id", "in", mediaIds)
    .select();

  if (error) {
    throw new SupabasePostgrestActionError(error);
  }

  return data;
};
