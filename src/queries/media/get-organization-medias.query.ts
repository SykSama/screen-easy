import { SupabasePostgrestActionError } from "@/lib/errors/errors";
import type { Tables } from "@/types/database.types";
import { createClient } from "@/utils/supabase/server";

export type GetOrganizationMediasInput = Pick<
  Tables<"media">,
  "organization_id"
> & {
  query?: string;
};

export type GetOrganizationMediasOutput = Tables<"media"> & {
  collections: Pick<Tables<"collections">, "id" | "name">[];
};

export const getOrganizationMediasQuery = async ({
  organization_id,
  query,
}: GetOrganizationMediasInput): Promise<GetOrganizationMediasOutput[]> => {
  const supabase = await createClient();

  const sQuery = supabase
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
    .eq("organization_id", organization_id);

  if (query) {
    sQuery.ilike("name", `%${query}%`);
  }

  sQuery.order("created_at", { ascending: false });

  const { data, error } = await sQuery;

  if (error) {
    throw new SupabasePostgrestActionError(error);
  }

  return data;
};
