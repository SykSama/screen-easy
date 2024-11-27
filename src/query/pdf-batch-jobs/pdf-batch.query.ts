import { SupabasePostgrestActionError } from "@/lib/errors/errors";
import type { Tables } from "@/types/database.generated.types";
import { createClient } from "@/utils/supabase/server";

export type BatchWithJobs = Tables<"pdf_batch_jobs"> & {
  pdf_jobs: Tables<"pdf_jobs">[];
};

export const getBatchWithJobs = async (
  batchId: string,
): Promise<BatchWithJobs> => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("pdf_batch_jobs")
    .select(
      `*,
      pdf_jobs(*)
    `,
    )
    .eq("id", batchId)
    .limit(1)
    .single();

  if (error) throw new SupabasePostgrestActionError(error);

  return data;
};
