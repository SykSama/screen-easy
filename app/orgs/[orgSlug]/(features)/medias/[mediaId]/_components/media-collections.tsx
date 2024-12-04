import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { GetMediaOutput } from "@/queries/media/get-media.query";
import Link from "next/link";

type MediaCollectionsProps = {
  media: GetMediaOutput;
  orgSlug: string;
};

export const MediaCollections = ({ media, orgSlug }: MediaCollectionsProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Collections</CardTitle>
      </CardHeader>
      <CardContent>
        {media.collections.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            This media is not in any collection
          </p>
        ) : (
          <ul className="space-y-2">
            {media.collections.map((collection) => (
              <li key={collection.id}>
                <Link
                  href={`/orgs/${orgSlug}/collections/${collection.id}`}
                  className="text-sm hover:underline"
                >
                  {collection.name}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
};
