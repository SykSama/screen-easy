import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getOrgMembersQuery } from "@/query/orgs/get-org-members.query";
import { getOrgQuery } from "@/query/orgs/get-org.query";
import { TeamMembersTable } from "./team-members-table";

export type PageContentProps = {
  orgSlug: string;
};

export const PageContent = async ({ orgSlug }: PageContentProps) => {
  const org = await getOrgQuery(orgSlug);
  const members = await getOrgMembersQuery(org.id);

  return (
    <>
      <div className="flex items-center justify-between gap-2">
        <Input
          placeholder="Filter members"
          className="h-8 w-[200px] bg-transparent"
        />
        <div className="flex gap-2">
          <Button variant="outline-destructive" size="xs">
            Leave organization
          </Button>
          <Button size="xs">Invite member</Button>
        </div>
      </div>
      <TeamMembersTable members={members} />
    </>
  );
};
