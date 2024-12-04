import { getCollectionsQuery } from "@/queries/collections/get-collections.query";
import { getOrganizationFromSlugQuery } from "@/queries/orgs/get-organization.query";
import { CreateMediaForm } from "./create-media-form";

export default async function MediasNewPage({
  params,
}: {
  params: { orgSlug: string };
}) {
  const organization = await getOrganizationFromSlugQuery(params.orgSlug);
  const collections = await getCollectionsQuery({
    organization_id: organization.id,
  });

  const collectionOptions = collections.map((collection) => ({
    label: collection.name,
    value: collection.id,
  }));

  return (
    <div className="grow p-6 lg:rounded-lg lg:p-10 lg:shadow-sm">
      <div className="mx-auto max-w-6xl">
        <CreateMediaForm collectionOptions={collectionOptions} />
      </div>
    </div>
  );
}
