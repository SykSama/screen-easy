"use client";

import type { MembersFromOrganization } from "@/query/orgs/get-org-members.query";
import type { Tables } from "@/types/database.generated.types";

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
  roles: Tables<"membership_roles">[];
};

export const RoleSelector = ({ member, roles }: RoleSelectorProps) => {
  const {
    execute: updateRole,
    optimisticState,
    reset,
    status,
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

  const isLoading = status === "executing";

  return (
    <Select
      defaultValue={member.membership_roles.id}
      value={optimisticState}
      onValueChange={async (value) =>
        handleRoleChange(member.profiles.id, value)
      }
      disabled={isLoading}
    >
      <SelectTrigger className="h-8 w-[100px]">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {roles.map((role) => (
          <SelectItem key={role.id} value={role.id}>
            {role.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
