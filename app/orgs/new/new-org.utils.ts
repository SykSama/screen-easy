import type { Tables } from "@/types/database.types";
import { createClient } from "@/utils/supabase/server";

export const getOrganizationPlans = async (): Promise<
  Tables<"organization_plans">[]
> => {
  const supabase = await createClient();

  const { data: plans, error } = await supabase
    .from("organization_plans")
    .select("*")
    .order("created_at", { ascending: true });

  if (error) throw error;
  return plans;
};

export const generateDefaultOrgName = (email: string) => {
  const nameWithoutDomain = email.split("@")[0];
  return `${nameWithoutDomain}'s org`;
};
