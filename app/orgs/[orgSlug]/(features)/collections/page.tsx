import { Button } from "@/components/ui/button";
import { SearchInput } from "@/features/filters/components/search-input";
import type { PageParams } from "@/types/next";
import Link from "next/link";
import { Suspense } from "react";
import { CollectionsDataTable } from "./_components/collections-data-table/collections-data-table";
import { CollectionsDataTableSkeleton } from "./_components/collections-data-table/collections-data-table-skeleton";

type CollectionsPageParams = {
  orgSlug: string;
};

type CollectionsPageSearchParams = {
  query?: string;
};

export default async function CollectionsPage({
  params,
  searchParams,
}: PageParams<CollectionsPageParams, CollectionsPageSearchParams>) {
  const { orgSlug } = await params;
  const { query } = await searchParams;

  return (
    <div className="pt-4">
      <div className="container mx-auto flex flex-col gap-4">
        <div className="flex items-center justify-between gap-2">
          <SearchInput placeholder="Find a collection" />
          <div className="flex gap-2">
            <Button asChild size={"xs"}>
              <Link href={`/orgs/${orgSlug}/collections/new`}>Add</Link>
            </Button>
          </div>
        </div>

        <Suspense key={query} fallback={<CollectionsDataTableSkeleton />}>
          <CollectionsDataTable organizationSlug={orgSlug} query={query} />
        </Suspense>
      </div>
    </div>
  );
}
