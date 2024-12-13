import { getCollectionQuery } from "@/queries/collections/get-collections.query";
import type { PageParams } from "@/types/next";
import { CreateCollectionForm } from "../new/create-collection-form";

export default async function UpdateCollectionPage(
  props: PageParams<{ collectionId: string }>,
) {
  const { collectionId } = await props.params;
  return (
    <div className="grow p-6 lg:rounded-lg lg:p-10 lg:shadow-sm">
      <div className="mx-auto max-w-6xl">
        <UpdateCollectionPageContent collectionId={collectionId} />
      </div>
    </div>
  );
}

export const UpdateCollectionPageContent = async ({
  collectionId,
}: {
  collectionId: string;
}) => {
  const collection = await getCollectionQuery({ id: collectionId });
  return <CreateCollectionForm initialValue={collection} />;
};
