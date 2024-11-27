import { SupabasePostgrestActionError } from "@/lib/errors/errors";
import type { Tables, TablesInsert } from "@/types/database.types";
import { createClient } from "@/utils/supabase/server";

export const createPdfJobResultsQuery = async (
  results: TablesInsert<"pdf_job_results">[],
): Promise<Tables<"pdf_job_results">[]> => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("pdf_job_results")
    .insert(results)
    .select();

  if (error) {
    throw new SupabasePostgrestActionError(error);
  }

  return data;
};
