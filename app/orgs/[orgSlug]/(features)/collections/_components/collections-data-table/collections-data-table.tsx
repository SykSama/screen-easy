import { Card, CardContent } from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";

import { Button } from "@/components/ui/button";
import { getCollectionsQuery } from "@/queries/collections/get-collections.query";
import { getOrganizationFromSlugQuery } from "@/queries/orgs/get-organization.query";
import { PlusIcon } from "lucide-react";
import Link from "next/link";
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
        <DataTable
          columns={columns}
          data={items}
          emptyComponent={
            <div className="flex flex-col items-center justify-center gap-2">
              <p className="text-base text-muted-foreground">
                No collections found
              </p>
              <Button asChild size="sm">
                <Link href={`/orgs/${organizationSlug}/collections/new`}>
                  <PlusIcon className="size-4" />
                  Create collection
                </Link>
              </Button>
            </div>
          }
        />
      </CardContent>
    </Card>
  );
};
