"use client";

import { AvatarComponent } from "@/components/nav-user";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { MembersFromOrganization } from "@/query/orgs/get-org-members.query";
import { Trash2Icon } from "lucide-react";

type TeamMembersTableProps = {
  members: MembersFromOrganization[];
};

export const TeamMembersTable = ({ members }: TeamMembersTableProps) => {
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
                <TableCell className="flex items-center gap-3">
                  <AvatarComponent
                    user={{
                      name: member.profiles.email?.split("@")[0] ?? "",
                      email: member.profiles.email,
                      avatar: "/avatars/shadcn.jpg",
                    }}
                  />
                  <div className="flex items-center gap-3">
                    <div className="flex flex-col">
                      <span className="text-sm">{member.profiles.email}</span>
                      {member.profiles.id === "you" && (
                        <span className="text-xs text-muted-foreground">
                          You
                        </span>
                      )}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Select defaultValue={member.membership_roles.id}>
                    <SelectTrigger className="h-8 w-[100px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="OWNER">Owner</SelectItem>
                      <SelectItem value="ADMIN">Admin</SelectItem>
                      <SelectItem value="MEMBER">Member</SelectItem>
                    </SelectContent>
                  </Select>
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
