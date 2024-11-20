"use client";

import { AvatarComponent } from "@/components/nav-user";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { LoadingButton } from "@/components/loading-button";
import { Badge } from "@/components/ui/badge";
import type { MembersFromOrganization } from "@/query/orgs/get-org-members.query";
import type { Tables } from "@/types/database.generated.types";
import type { User } from "@supabase/supabase-js";
import { Trash2Icon } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";
import { removeMemberAction } from "./remove-member.action";
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
  const { execute, result, isPending } = useAction(removeMemberAction);

  const handleRemoveMember = (memberId: string) => {
    execute({ memberId });

    if (result.serverError) {
      toast.error(result.serverError);
      return;
    }

    if (result.validationErrors) {
      toast.error(result.validationErrors.memberId?._errors?.join(" "));
      return;
    }

    toast.success("Member removed successfully");
  };

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
                  {member.profiles.id !== user.id && (
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                        >
                          <Trash2Icon className="size-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Remove member</DialogTitle>
                          <DialogDescription>
                            Are you sure you want to remove this member from the
                            organization? This action cannot be undone.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="flex justify-end gap-2">
                          <LoadingButton
                            isLoading={isPending}
                            variant="destructive"
                            onClick={() =>
                              handleRemoveMember(member.profiles.id)
                            }
                          >
                            Remove
                          </LoadingButton>
                        </div>
                      </DialogContent>
                    </Dialog>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
