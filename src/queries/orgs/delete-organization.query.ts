import { SupabasePostgrestActionError } from "@/lib/errors/errors";
import type { Tables } from "@/types/database.types";
import { createClient } from "@/utils/supabase/server";

export type DeleteOrganizationProps = Pick<Tables<"organizations">, "id">;

export const deleteOrganizationQuery = async ({
  id,
}: DeleteOrganizationProps): Promise<void> => {
  const supabase = await createClient();

  const { error } = await supabase.from("organizations").delete().eq("id", id);

  if (error) {
    throw new SupabasePostgrestActionError(error);
  }
};
