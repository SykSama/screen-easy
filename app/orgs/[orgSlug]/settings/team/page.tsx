import { Button } from "@/components/ui/button";
import { requiredAuth } from "@/features/auth/helper";
import type { PageParams } from "@/types/next";

import Link from "next/link";
import { Suspense } from "react";

import { LeaveOrganizationButton } from "./_components/leave/leave-org-button";
import { TeamMembersTable } from "./team-members-table";
import { TeamMembersTableSkeleton } from "./team-members-table-skeleton";
import { SearchInput } from "@/features/filters/components/search-input";

export default async function TeamSettingsPage({
  params,
  searchParams,
}: PageParams<{ orgSlug: string }>) {
  const { orgSlug } = await params;
  const { searchQuery } = await searchParams;

  return (
    <div className="flex flex-1 flex-col gap-4 p-8 pt-4">
      <Suspense fallback={<div>Loading...</div>}>
        <PageContent
          orgSlug={orgSlug}
          searchQuery={searchQuery as string | undefined}
        />
      </Suspense>
    </div>
  );
}

export type PageContentProps = {
  orgSlug: string;
  searchQuery?: string;
};

const PageContent = async ({ orgSlug, searchQuery }: PageContentProps) => {
  const { user } = await requiredAuth();

  return (
    <>
      <div className="flex items-center justify-between gap-2">
        <SearchInput />
        <div className="flex gap-2">
          <LeaveOrganizationButton />
          <Button asChild size={"xs"}>
            <Link href={`/orgs/${orgSlug}/settings/team/invite`}>
              Invite a member
            </Link>
          </Button>
        </div>
      </div>

      <Suspense fallback={<TeamMembersTableSkeleton />}>
        <TeamMembersTable
          user={user}
          orgSlug={orgSlug}
          searchQuery={searchQuery}
        />
      </Suspense>
    </>
  );
};
