import { Card, CardContent } from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";

import { getDevicesQuery } from "@/queries/devices/get-devices.query";
import { getOrganizationFromSlugQuery } from "@/queries/orgs/get-organization.query";
import { columns } from "./devices-columns";

export const DevicesDataTable = async ({
  organizationSlug,
}: {
  organizationSlug: string;
}) => {
  const organization = await getOrganizationFromSlugQuery(organizationSlug);
  const devices = await getDevicesQuery({
    organization_id: organization.id,
  });

  return (
    <Card>
      <CardContent className="p-0">
        <DataTable columns={columns} data={devices} />
      </CardContent>
    </Card>
  );
};
