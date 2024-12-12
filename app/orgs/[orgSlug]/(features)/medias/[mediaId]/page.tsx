import { getMediaQuery } from "@/queries/media/get-media.query";

import type { PageParams } from "@/types/next";
import { MediaCollections } from "./_components/media-collections";
import { MediaHeader } from "./_components/media-header";
import { MediaPreview } from "@/features/medias/components/media-preview/media-preview";

export default async function MediaPage(
  props: PageParams<{ orgSlug: string; mediaId: string }>,
) {
  const { orgSlug, mediaId } = await props.params;
  const media = await getMediaQuery(mediaId);

  return (
    <div className="container mx-auto flex flex-col gap-8 py-8">
      <MediaHeader media={media} />
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <MediaPreview media={media} />
        </div>
        <div>
          <MediaCollections media={media} orgSlug={orgSlug} />
        </div>
      </div>
    </div>
  );
}
