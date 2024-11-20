import { NotFoundError } from "@/lib/errors/errors";
import type { Tables } from "@/types/database.generated.types";
import { createClient } from "@/utils/supabase/server";

export const getPlansQuery = async (): Promise<
  Tables<"organization_plans">[]
> => {
  const supabase = await createClient();

  const { data } = await supabase
    .from("organization_plans")
    .select("*")
    .throwOnError();

  if (!data) {
    return [];
  }

  return data;
};

export const getPlanQuery = async (
  id: string,
): Promise<Tables<"organization_plans">> => {
  const supabase = await createClient();

  const { data } = await supabase
    .from("organization_plans")
    .select("*")
    .eq("id", id)
    .limit(1)
    .single()
    .throwOnError();

  if (!data) {
    throw new NotFoundError("Plan not found");
  }

  return data;
};
