"use server";

import { logger } from "@/lib/logger";
import type { Tables } from "@/types/database.generated.types";
import { createClient } from "@/utils/supabase/server";

const log = logger.child({
  module: "getOrgQuery",
});

export const getOrgQuery = async (
  slug: string,
): Promise<Tables<"organizations">> => {
  const supabase = await createClient();

  try {
    const { data, error } = await supabase
      .from("organizations")
      .select("*")
      .eq("slug", slug)
      .single();

    if (error) throw error;
    if (!data) throw new Error("Organization not found");

    return data;
  } catch (err) {
    log.error(err);
    throw err;
  }
};
