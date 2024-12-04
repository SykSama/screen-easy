import { SupabasePostgrestActionError } from "@/lib/errors/errors";
import type { Tables } from "@/types/database.types";
import { createClient } from "@/utils/supabase/server";

export type GetOrganizationMediasInput = Pick<
  Tables<"media">,
  "organization_id"
>;

export const getOrganizationMediasQuery = async ({
  organization_id,
}: GetOrganizationMediasInput) => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("media")
    .select("*")
    .eq("organization_id", organization_id)
    .order("created_at", { ascending: false });

  if (error) {
    throw new SupabasePostgrestActionError(error);
  }

  return data;
};
