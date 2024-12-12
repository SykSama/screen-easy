import { SupabasePostgrestActionError } from "@/lib/errors/errors";
import type { Tables } from "@/types/database.generated.types";
import { createClient } from "@/utils/supabase/server";

export type GetCollectionsInput = Pick<
  Tables<"collections">,
  "organization_id"
>;

export const getCollectionsQuery = async ({
  organization_id,
}: GetCollectionsInput) => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("collections")
    .select()
    .eq("organization_id", organization_id)
    .order("created_at", { ascending: false });

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

export const getCollectionQuery = async ({
  id,
}: Pick<Tables<"collections">, "id">): Promise<GetCollectionOutput> => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("collections")
    .select("*, media(*), collection_media(duration, display_order, media_id)")
    .eq("id", id)
    .single();

  if (error) {
    throw new SupabasePostgrestActionError(error);
  }

  const { media, collection_media, ...rest } = data;

  const collectionWithDurationMedia = media.map((media) => ({
    ...media,
    duration:
      collection_media.find((cm) => cm.media_id === media.id)?.duration ??
      10000,
    display_order:
      collection_media.find((cm) => cm.media_id === media.id)?.display_order ??
      0,
  }));

  return { ...rest, medias: collectionWithDurationMedia };
};
