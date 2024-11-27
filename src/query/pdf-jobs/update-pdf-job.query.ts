import { SupabasePostgrestActionError } from "@/lib/errors/errors";
import type { Tables, TablesUpdate } from "@/types/database.types";
import { createClient } from "@/utils/supabase/server";

export type UpdatePdfJobQueryProps = {
  jobId: string;
  pdfJob: TablesUpdate<"pdf_jobs">;
};

export const updatePdfJobQuery = async ({
  jobId,
  pdfJob,
}: UpdatePdfJobQueryProps): Promise<Tables<"pdf_jobs">> => {
  const supabase = await createClient();

  const { data: updatedJob, error } = await supabase
    .from("pdf_jobs")
    .update(pdfJob)
    .eq("id", jobId)
    .select()
    .single();

  if (error) {
    throw new SupabasePostgrestActionError(error);
  }

  return updatedJob;
};
