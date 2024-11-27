import { SupabasePostgrestActionError } from "@/lib/errors/errors";
import type { Tables } from "@/types/database.types";
import { createClient } from "@/utils/supabase/server";

export const getPdfJobQuery = async (
  jobId: string,
): Promise<Tables<"pdf_jobs">> => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("pdf_jobs")
    .select("*")
    .eq("id", jobId)
    .limit(1)
    .single();

  if (error) {
    throw new SupabasePostgrestActionError(error);
  }

  return data;
};
