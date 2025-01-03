import { AvatarComponent } from "@/components/nav-user";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Badge } from "@/components/ui/badge";

import { getMembershipRolesQuery } from "@/queries/membership-roles/get-membership-roles.query";
import { getOrganizationMembersQuery } from "@/queries/orgs/get-organization-members.query";
import { getOrganizationFromSlugQuery } from "@/queries/orgs/get-organization.query";
import type { User } from "@supabase/supabase-js";
import { RemoveMemberButton } from "./_components/remove-member/remove-member-button";
import { RoleSelector } from "./_components/update-role/role-selector";

type TeamMembersTableProps = {
  user: User;
  orgSlug: string;
  searchQuery?: string;
};

export const TeamMembersTable = async ({
  user,
  orgSlug,
  searchQuery,
}: TeamMembersTableProps) => {
  const org = await getOrganizationFromSlugQuery(orgSlug);
  const members = await getOrganizationMembersQuery(org.id, searchQuery);
  const roles = await getMembershipRolesQuery();

  return (
    <Card>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Role</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {members.map((member) => (
              <TableRow key={member.profiles.id}>
                <TableCell className="flex items-center gap-2 align-middle">
                  <AvatarComponent
                    user={{
                      name: member.profiles.email.split("@")[0] ?? "",
                      email: member.profiles.email,
                      avatar: "/avatars/shadcn.jpg",
                    }}
                  />
                  <span className="text-sm">{member.profiles.email}</span>
                  {member.profiles.id === user.id && (
                    <Badge variant="outline">You</Badge>
                  )}
                </TableCell>
                <TableCell>
                  <RoleSelector member={member} roles={roles} />
                </TableCell>
                <TableCell>
                  <RemoveMemberButton
                    memberId={member.profiles.id}
                    isCurrentUser={member.profiles.id === user.id}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
