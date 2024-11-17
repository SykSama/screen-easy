"use client";

import { AvatarComponent } from "@/components/nav-user";
import { Button } from "@/components/ui/button";
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
import type { MembersFromOrganization } from "@/query/orgs/get-org-members.query";
import type { Tables } from "@/types/database.generated.types";
import type { User } from "@supabase/supabase-js";
import { Trash2Icon } from "lucide-react";
import { RoleSelector } from "./role-selector";

type TeamMembersTableProps = {
  members: MembersFromOrganization[];
  roles: Tables<"membership_roles">[];
  user: User;
};

export const TeamMembersTable = ({
  members,
  roles,
  user,
}: TeamMembersTableProps) => {
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
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                  >
                    <Trash2Icon className="size-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
