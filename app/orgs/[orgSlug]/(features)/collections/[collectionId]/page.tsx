import { getCollectionQuery } from "@/queries/collections/get-collections.query";
import type { PageParams } from "@/types/next";
import { Suspense } from "react";

export default async function UpdateCollectionPage(
  props: PageParams<{ collectionId: string }>,
) {
  const { collectionId } = await props.params;
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <UpdateCollectionPageContent collectionId={collectionId} />
    </Suspense>
  );
}

export const UpdateCollectionPageContent = async ({
  collectionId,
}: {
  collectionId: string;
}) => {
  const collection = await getCollectionQuery({ id: collectionId });

  return <div></div>;
};
