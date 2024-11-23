import { SupabasePostgrestActionError } from "@/lib/errors/errors";
import type { Tables, TablesInsert } from "@/types/database.generated.types";
import { createClient } from "@/utils/supabase/server";
import type { PostgrestError } from "@supabase/supabase-js";

export const createPdfJobsQuery = async (
  jobs: TablesInsert<"pdf_jobs">[],
): Promise<Tables<"pdf_jobs">[]> => {
  const supabase = await createClient();

  try {
    const { data } = await supabase
      .from("pdf_jobs")
      .insert(jobs)
      .select()
      .throwOnError();

    return data ?? [];
  } catch (error) {
    throw new SupabasePostgrestActionError(error as PostgrestError);
  }
};
