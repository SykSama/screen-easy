import { SupabasePostgrestActionError } from "@/lib/errors/errors";
import { logger } from "@/lib/logger";
import type { Tables } from "@/types/database.types";
import { createClient } from "@/utils/supabase/server";

export type GetServiceAccountsFromOrganizationInput = {
  organization_id: string;
};

export const getServiceAccountsFromOrganizationQuery = async ({
  organization_id,
}: GetServiceAccountsFromOrganizationInput): Promise<
  Tables<"service_accounts">[]
> => {
  const supabase = await createClient();

  logger.info(organization_id, "Organization ID");

  const { data, error } = await supabase
    .from("service_accounts")
    .select()
    .eq("organization_id", organization_id);

  if (error) {
    logger.error(error, "Error");
    throw new SupabasePostgrestActionError(error);
  }

  return data;
};
