import { SupabasePostgrestActionError } from "@/lib/errors/errors";
import type { Tables, TablesInsert } from "@/types/database.types";
import { createClient } from "@/utils/supabase/server";

type CreateBatchJobInput = TablesInsert<"pdf_batch_jobs">;

export const createBatchJobQuery = async (
  input: CreateBatchJobInput,
): Promise<Tables<"pdf_batch_jobs">> => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("pdf_batch_jobs")
    .insert(input)
    .select()
    .single();

  if (error) throw new SupabasePostgrestActionError(error);

  return data;
};
