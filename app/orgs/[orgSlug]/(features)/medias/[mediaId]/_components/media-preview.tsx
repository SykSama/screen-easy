import { Card, CardContent } from "@/components/ui/card";
import { Page404 } from "@/features/pages/Page404";
import type { GetMediaOutput } from "@/queries/media/get-media.query";
import { createClient } from "@/utils/supabase/server";
import Image from "next/image";

type MediaPreviewProps = {
  media: GetMediaOutput;
};

export const MediaPreview = async ({ media }: MediaPreviewProps) => {
  const supabase = await createClient();
  const { data, error } = await supabase.storage
    .from("organizations")
    .createSignedUrl(media.url, 60 * 60);

  if (error) {
    return <Page404 />;
  }

  return (
    <Card>
      <CardContent className="p-4">
        {media.type === "image" ? (
          <div className="relative aspect-video w-full overflow-hidden rounded-lg">
            <Image
              src={data.signedUrl}
              alt={media.name}
              fill
              className="object-contain"
            />
          </div>
        ) : (
          <video
            src={media.url}
            controls
            className="aspect-video w-full rounded-lg"
          />
        )}
      </CardContent>
    </Card>
  );
};
