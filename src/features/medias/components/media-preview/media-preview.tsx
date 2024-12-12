import type { Tables } from "@/types/database.types";
import { createClient } from "@/utils/supabase/server";
import type { TransformOptions } from "@supabase/storage-js";
import { ImageIcon, ImageOff } from "lucide-react";
import Image from "next/image";

type MediaPreviewProps = {
  media: Pick<Tables<"media">, "id" | "path" | "type" | "name">;
  transform?: TransformOptions;
};

export const MediaPreview = async ({ media, transform }: MediaPreviewProps) => {
  const supabase = await createClient();

  const { data, error } = await supabase.storage
    .from("organizations")
    .createSignedUrl(media.path, 60 * 60, {
      transform: transform,
    });

  if (error) {
    return (
      <div className="relative aspect-square w-full overflow-hidden rounded-lg">
        <ImageOff className="size-10" />
      </div>
    );
  }

  if (media.type === "image") {
    return (
      <div className="relative aspect-square w-full overflow-hidden rounded-lg">
        <Image
          src={data.signedUrl}
          alt={media.name}
          fill
          className="object-contain"
        />
      </div>
    );
  }

  return (
    <div className="relative aspect-square w-full overflow-hidden rounded-lg">
      <ImageIcon className="size-10" />
    </div>
  );
};
