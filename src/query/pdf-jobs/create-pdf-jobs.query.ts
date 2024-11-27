import { SupabasePostgrestActionError } from "@/lib/errors/errors";
import type { Tables, TablesInsert } from "@/types/database.types";
import { createClient } from "@/utils/supabase/server";
import type { PostgrestError } from "@supabase/supabase-js";

export const createPdfJobsQuery = async (
  jobs: TablesInsert<"pdf_jobs">[],
): Promise<Tables<"pdf_jobs">[]> => {
  const supabase = await createClient();

  const { data, error } = await supabase.from("pdf_jobs").insert(jobs).select();

  if (error) {
    throw new SupabasePostgrestActionError(error as PostgrestError);
  }

  return data;
};
