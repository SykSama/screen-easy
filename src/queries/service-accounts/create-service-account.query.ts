import { SupabasePostgrestActionError } from "@/lib/errors/errors";
import type { Tables, TablesInsert } from "@/types";

import { createClient } from "@/utils/supabase/server";

export type CreateServiceAccountInput = TablesInsert<"service_accounts">;

export const createServiceAccountQuery = async (
  serviceAccount: CreateServiceAccountInput,
): Promise<Tables<"service_accounts">> => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("service_accounts")
    .insert(serviceAccount)
    .select()
    .single();

  if (error) {
    throw new SupabasePostgrestActionError(error);
  }

  return data;
};
