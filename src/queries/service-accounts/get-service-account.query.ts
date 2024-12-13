import { SupabasePostgrestActionError } from "@/lib/errors/errors";
import type { Tables } from "@/types";
import { createClient } from "@/utils/supabase/server";

export type GetServiceAccountInput = {
  id: string;
};

export const getServiceAccountQuery = async ({
  id,
}: GetServiceAccountInput): Promise<Tables<"service_accounts">> => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("service_accounts")
    .select()
    .eq("id", id)
    .single();

  if (error) {
    throw new SupabasePostgrestActionError(error);
  }

  return data;
};
