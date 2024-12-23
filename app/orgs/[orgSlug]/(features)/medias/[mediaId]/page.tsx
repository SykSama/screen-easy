import { getMediaQuery } from "@/queries/media/get-media.query";
import type { PageParams } from "@/types/next";
import { UpdateMediaForm } from "./_components/update-media-form";

type MediaPageParams = {
  orgSlug: string;
  mediaId: string;
};

export default async function MediaPage({
  params,
}: PageParams<MediaPageParams>) {
  const { mediaId } = await params;

  const media = await getMediaQuery(mediaId);

  return (
    <div className="container mx-auto py-8">
      <UpdateMediaForm media={media} initialCollections={media.collections} />
    </div>
  );
}
