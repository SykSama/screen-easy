import { SupabasePostgrestActionError } from "@/lib/errors/errors";
import type { Tables } from "@/types/database.types";
import { createClient } from "@/utils/supabase/server";

export type GetOrganizationMediasInput = Pick<
  Tables<"media">,
  "organization_id"
>;

export type GetOrganizationMediasOutput = Tables<"media"> & {
  collections: Pick<Tables<"collections">, "id" | "name">[];
};

export const getOrganizationMediasQuery = async ({
  organization_id,
}: GetOrganizationMediasInput): Promise<GetOrganizationMediasOutput[]> => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("media")
    .select(
      `
      *,
      collections (
          id,
          name
        )
    `,
    )
    .eq("organization_id", organization_id)
    .order("created_at", { ascending: false });

  if (error) {
    throw new SupabasePostgrestActionError(error);
  }

  return data;
};
