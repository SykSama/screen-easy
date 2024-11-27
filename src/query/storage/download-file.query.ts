import { SupabaseStorageActionError } from "@/lib/errors/errors";
import { createClient } from "@/utils/supabase/server";

export const downloadFileQuery = async (path: string): Promise<Blob> => {
  const supabase = await createClient();

  const { data, error } = await supabase.storage
    .from("organizations")
    .download(path);

  if (error) {
    throw new SupabaseStorageActionError(error);
  }

  return data;
};
