import { SupabaseStorageActionError } from "@/lib/errors/errors";
import type { Tables } from "@/types/database.types";
import { createClient } from "@/utils/supabase/server";

export type UploadMediaInput = {
  file: File;
  organization_id: Tables<"organizations">["id"];
};

export type UploadMediaOutput = {
  mediaPath: string;
  generatedMediaId: string;
};

export const uploadMediaQuery = async ({
  file,
  organization_id,
}: UploadMediaInput): Promise<UploadMediaOutput> => {
  const supabase = await createClient();

  const generatedMediaId = crypto.randomUUID();
  const fileExt = file.name.split(".").pop();
  const fileName = `${generatedMediaId}.${fileExt}`;
  const mediaPath = `${organization_id}/medias/${generatedMediaId}/${fileName}.${fileExt}`;

  const { error } = await supabase.storage
    .from("organizations")
    .upload(mediaPath, file, {
      contentType: file.type,
      cacheControl: "3600",
      upsert: false,
    });

  if (error) {
    throw new SupabaseStorageActionError(error);
  }

  return { mediaPath, generatedMediaId };
};
