import { SupabaseStorageActionError } from "@/lib/errors/errors";
import { createClient } from "@/utils/supabase/server";

type UploadFileInput = {
  file: File;
  path: string;
};

export const uploadFileQuery = async ({ file, path }: UploadFileInput) => {
  const supabase = await createClient();

  const { error } = await supabase.storage
    .from("organizations")
    .upload(path, file, {
      contentType: file.type,
      cacheControl: "3600",
      upsert: false,
    });

  if (error) throw new SupabaseStorageActionError(error);

  return { storagePath: path };
};
