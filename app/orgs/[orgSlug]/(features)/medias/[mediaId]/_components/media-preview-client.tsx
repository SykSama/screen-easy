"use client";

import type { Tables } from "@/types/database.types";
import { createClient } from "@/utils/supabase/client";
import type { TransformOptions } from "@supabase/storage-js";
import { useQuery } from "@tanstack/react-query";
import { ImageIcon, ImageOff } from "lucide-react";
import Image from "next/image";

type MediaPreviewProps = {
  media: Pick<Tables<"media">, "id" | "path" | "type" | "name">;
  transform?: TransformOptions;
};

export const MediaPreview = ({ media, transform }: MediaPreviewProps) => {
  const supabase = createClient();

  const { data: signedUrl, isError } = useQuery({
    queryKey: ["mediaUrl", media.path, transform],
    queryFn: async () => {
      const { data, error } = await supabase.storage
        .from("organizations")
        .createSignedUrl(media.path, 60 * 60, {
          transform: transform,
        });

      if (error) throw error;
      return data.signedUrl;
    },
  });

  if (isError) {
    return (
      <div className="relative aspect-square w-full overflow-hidden rounded-lg">
        <ImageOff className="size-10" />
      </div>
    );
  }

  if (media.type === "image" && signedUrl) {
    return (
      <div className="relative aspect-square w-full overflow-hidden rounded-lg">
        <Image
          src={signedUrl}
          alt={media.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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
