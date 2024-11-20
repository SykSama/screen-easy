import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { requiredAuth } from "@/features/auth/helper";
import { getMembershipRolesQuery } from "@/query/orgs/get-membership-roles.query";
import { getOrgMembersQuery } from "@/query/orgs/get-org-members.query";
import { getOrgQuery } from "@/query/orgs/get-org.query";
import type { PageParams } from "@/types/next";

import Link from "next/link";
import { Suspense } from "react";
import { LeaveOrganizationButton } from "./_components/leave/leave-org-button";
import { TeamMembersTable } from "./team-members-table";

// TODO: Filters
export default async function TeamSettingsPage({
  params,
}: PageParams<{ orgSlug: string }>) {
  const { orgSlug } = await params;

  return (
    <div className="flex flex-1 flex-col gap-4 p-8 pt-4">
      <Suspense fallback={<div>Loading...</div>}>
        <PageContent orgSlug={orgSlug} />
      </Suspense>
    </div>
  );
}

export type PageContentProps = {
  orgSlug: string;
};

const PageContent = async ({ orgSlug }: PageContentProps) => {
  const { user } = await requiredAuth();
  const org = await getOrgQuery(orgSlug);
  const members = await getOrgMembersQuery(org.id);
  const roles = await getMembershipRolesQuery();

  return (
    <>
      <div className="flex items-center justify-between gap-2">
        <Input
          placeholder="Filter members"
          className="h-8 w-[200px] bg-transparent"
        />
        <div className="flex gap-2">
          <LeaveOrganizationButton />
          <Button asChild size={"xs"}>
            <Link href={`/orgs/${orgSlug}/settings/team/invite`}>
              Invite a member
            </Link>
          </Button>
        </div>
      </div>
      <TeamMembersTable members={members} roles={roles} user={user} />
    </>
  );
};
