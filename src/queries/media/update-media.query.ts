import { SupabasePostgrestActionError } from "@/lib/errors/errors";
import type { Tables, TablesUpdate } from "@/types/database.generated.types";
import { createClient } from "@/utils/supabase/server";

type UpdateMediaInput = {
  id: string;
  data: TablesUpdate<"media">;
  collectionIds: string[];
};

export const updateMediaQuery = async ({
  id,
  data,
  collectionIds,
}: UpdateMediaInput): Promise<Tables<"media">> => {
  const supabase = await createClient();

  // Update media
  const { data: updatedMedia, error: updateError } = await supabase
    .from("media")
    .update(data)
    .eq("id", id)
    .select()
    .single();

  if (updateError) {
    throw new SupabasePostgrestActionError(updateError);
  }

  // Upsert collections
  const { data: collectionMedias, error: upsertError } = await supabase
    .from("collection_media")
    .upsert(
      collectionIds.map((collectionId) => ({
        collection_id: collectionId,
        media_id: id,
      })),
      { onConflict: "collection_id,media_id" },
    )
    .select();

  if (upsertError) {
    throw new SupabasePostgrestActionError(upsertError);
  }

  const collectionsIds = collectionMedias.map((cm) => cm.collection_id);

  // Delete collections that are not in the input
  const { error: deleteError } = await supabase
    .from("collection_media")
    .delete()
    .eq("media_id", id)
    .not("collection_id", "in", `(${collectionsIds.join(",")})`);

  if (deleteError) {
    throw new SupabasePostgrestActionError(deleteError);
  }

  return updatedMedia;
};
