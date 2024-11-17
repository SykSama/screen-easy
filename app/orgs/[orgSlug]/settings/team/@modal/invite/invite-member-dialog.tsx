"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { Tables } from "@/types/database.generated.types";
import { useRouter } from "next/navigation";
import { InviteMemberForm } from "./invite-member-form";

type InviteMemberDialogProps = {
  roles: Tables<"membership_roles">[];
};

export const InviteMemberDialog = ({ roles }: InviteMemberDialogProps) => {
  const router = useRouter();

  return (
    <Dialog open={true} onOpenChange={() => router.back()}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Invite a member to this organization</DialogTitle>
        </DialogHeader>
        <InviteMemberForm roles={roles} onSuccess={() => router.back()} />
      </DialogContent>
    </Dialog>
  );
};
