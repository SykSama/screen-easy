import { Card, CardContent } from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";

import { getCollectionsQuery } from "@/queries/collections/get-collections.query";
import { getOrganizationFromSlugQuery } from "@/queries/orgs/get-organization.query";
import { columns } from "./collections-columns";

type CollectionsDataTableProps = {
  organizationSlug: string;
  query?: string;
};

export const CollectionsDataTable = async ({
  organizationSlug,
  query,
}: CollectionsDataTableProps) => {
  const organization = await getOrganizationFromSlugQuery(organizationSlug);
  const items = await getCollectionsQuery({
    organization_id: organization.id,
    query,
  });

  return (
    <Card>
      <CardContent className="p-0">
        <DataTable columns={columns} data={items} />
      </CardContent>
    </Card>
  );
};
