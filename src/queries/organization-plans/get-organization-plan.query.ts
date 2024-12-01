import { SupabasePostgrestActionError } from "@/lib/errors/errors";
import type { Tables } from "@/types/database.types";
import { createClient } from "@/utils/supabase/server";

export const getOrganizationPlansQuery = async (): Promise<
  Tables<"organization_plans">[]
> => {
  const supabase = await createClient();

  const { data, error } = await supabase.from("organization_plans").select("*");

  if (error) {
    throw new SupabasePostgrestActionError(error);
  }

  return data;
};

export const getOrganizationPlanQuery = async (
  id: string,
): Promise<Tables<"organization_plans">> => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("organization_plans")
    .select("*")
    .eq("id", id)
    .limit(1)
    .single();

  if (error) {
    throw new SupabasePostgrestActionError(error);
  }

  return data;
};
