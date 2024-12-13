import { Button } from "@/components/ui/button";
import { SearchInput } from "@/features/filters/components/search-input";
import type { PageParams } from "@/types/next";
import Link from "next/link";
import { Suspense } from "react";
import { CollectionsDataTable } from "./_components/collections-data-table/collections-data-table";

export default async function CollectionsPage({
  params,
}: PageParams<{ orgSlug: string }>) {
  const { orgSlug } = await params;

  return (
    <div className="pt-4">
      <Suspense fallback={<div>Loading...</div>}>
        <PageContent orgSlug={orgSlug} />
      </Suspense>
    </div>
  );
}

type PageContentProps = {
  orgSlug: string;
};

const PageContent = async ({ orgSlug }: PageContentProps) => {
  return (
    <div className="container mx-auto flex flex-col gap-4">
      <div className="flex items-center justify-between gap-2">
        <SearchInput placeholder="Find a collection" />
        <div className="flex gap-2">
          <Button asChild size={"xs"}>
            <Link href={`/orgs/${orgSlug}/collections/new`}>Add</Link>
          </Button>
        </div>
      </div>

      <Suspense fallback={<div>Loading...</div>}>
        <CollectionsDataTable organizationSlug={orgSlug} />
      </Suspense>
    </div>
  );
};
