import { getCollectionWithMediasQuery } from "@/queries/collections/get-collections.query";
import type { PageParams } from "@/types/next";
import { Suspense } from "react";
import { CollectionForm } from "../_components/collection-form/collection-form";

export default async function UpdateCollectionPage(
  props: PageParams<{ collectionId: string }>,
) {
  const { collectionId } = await props.params;

  return (
    <div className="grow p-6 lg:rounded-lg lg:p-10 lg:shadow-sm">
      <div className="mx-auto max-w-6xl">
        <Suspense fallback={<div>Loading...</div>}>
          <UpdateCollectionPageContent collectionId={collectionId} />
        </Suspense>
      </div>
    </div>
  );
}

export const UpdateCollectionPageContent = async ({
  collectionId,
}: {
  collectionId: string;
}) => {
  const collection = await getCollectionWithMediasQuery({ id: collectionId });
  return <CollectionForm initialValue={collection} />;
};
