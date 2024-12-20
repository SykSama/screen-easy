import { getCollectionsQuery } from "@/queries/collections/get-collections.query";
import { getDeviceQuery } from "@/queries/devices/get-devices.query";
import { getOrganizationFromSlugQuery } from "@/queries/orgs/get-organization.query";
import type { PageParams } from "@/types/next";
import { Suspense } from "react";
import { DeviceForm } from "../_components/device-form/device-form";

export default async function UpdateDevicePage({
  params,
}: PageParams<{ orgSlug: string; deviceId: string }>) {
  return (
    <div className="grow p-6 lg:rounded-lg lg:p-10 lg:shadow-sm">
      <div className="mx-auto max-w-6xl">
        <Suspense fallback={<div>Loading...</div>}>
          <UpdateDevicePageContent params={params} />
        </Suspense>
      </div>
    </div>
  );
}

export const UpdateDevicePageContent = async ({
  params,
}: {
  params: Promise<{ orgSlug: string; deviceId: string }>;
}) => {
  const { deviceId, orgSlug } = await params;

  const organization = await getOrganizationFromSlugQuery(orgSlug);
  const collections = await getCollectionsQuery({
    organization_id: organization.id,
  });

  const collectionOptions = collections.map((collection) => ({
    label: collection.name,
    value: collection.id,
  }));

  const device = await getDeviceQuery({ deviceId });
  return <DeviceForm initialValue={device} collections={collectionOptions} />;
};