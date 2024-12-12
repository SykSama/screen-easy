import { SupabaseStorageActionError } from "@/lib/errors/errors";
import type { Tables } from "@/types/database.types";
import { createClient } from "@/utils/supabase/client";
import type { TransformOptions } from "@supabase/storage-js";
import { useQuery } from "@tanstack/react-query";
import { ImageIcon } from "lucide-react";
import type { ImageProps } from "next/image";
import Image from "next/image";

export type MediaPreviewClientProps = {
  media: Pick<Tables<"media">, "id" | "path" | "type" | "name">;
  transform?: TransformOptions;
} & { imageProps?: Omit<ImageProps, "src" | "alt"> };

export const MediaPreviewClient = ({
  media,
  transform,
  imageProps,
}: MediaPreviewClientProps) => {
  const supabase = createClient();

  const {
    data: signedUrl,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["media_url", media.id, transform],
    queryFn: async () => {
      const { data, error } = await supabase.storage
        .from("organizations")
        .createSignedUrl(media.path, 60 * 60, {
          transform: transform,
        });

      if (error) throw new SupabaseStorageActionError(error);

      return data.signedUrl;
    },
  });

  if (isLoading) return "Loading...";
  if (isError) return "Error";
  if (!signedUrl) return null;

  if (media.type === "image") {
    return <Image src={signedUrl} alt={media.name} {...imageProps} />;
  }

  return <ImageIcon className="size-10" />;
};
