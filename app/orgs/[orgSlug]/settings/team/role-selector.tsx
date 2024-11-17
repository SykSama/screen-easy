"use client";

import type { MembersFromOrganization } from "@/query/orgs/get-org-members.query";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useOptimisticAction } from "next-safe-action/hooks";

import { toast } from "sonner";
import { updateRoleAction } from "./role.action";

export type RoleSelectorProps = {
  member: MembersFromOrganization;
};

export const RoleSelector = ({ member }: RoleSelectorProps) => {
  const {
    execute: updateRole,
    optimisticState,
    reset,
  } = useOptimisticAction(updateRoleAction, {
    currentState: member.membership_roles.id,
    updateFn: (_, input) => input.roleId,
    onError: ({ error }) => {
      reset();
      toast.error(error.serverError);
    },
    onSuccess: () => {
      toast.success("Role updated");
    },
  });

  const handleRoleChange = async (userId: string, roleId: string) => {
    return updateRole({ userId, roleId });
  };

  return (
    <Select
      defaultValue={member.membership_roles.id}
      value={optimisticState}
      onValueChange={async (value) =>
        handleRoleChange(member.profiles.id, value)
      }
    >
      <SelectTrigger className="h-8 w-[100px]">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="OWNER">Owner</SelectItem>
        <SelectItem value="ADMIN">Admin</SelectItem>
        <SelectItem value="MEMBER">Member</SelectItem>
      </SelectContent>
    </Select>
  );
};
