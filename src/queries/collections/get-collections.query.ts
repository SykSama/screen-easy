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
