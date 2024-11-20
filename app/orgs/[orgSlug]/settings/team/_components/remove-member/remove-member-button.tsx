"use client";

import { LoadingButton } from "@/components/loading-button";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Trash2Icon } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";
import { removeMemberAction } from "./remove-member.action";

type RemoveMemberButtonProps = {
  memberId: string;
  isCurrentUser: boolean;
};

export const RemoveMemberButton = ({
  memberId,
  isCurrentUser,
}: RemoveMemberButtonProps) => {
  const { executeAsync, isPending } = useAction(removeMemberAction);

  const handleRemoveMember = async () => {
    const result = await executeAsync({ memberId });

    if (!result) {
      return;
    }

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

  if (isCurrentUser) {
    return null;
  }

  return (
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
            Are you sure you want to remove this member from the organization?
            This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-end gap-2">
          <LoadingButton
            isLoading={isPending}
            variant="destructive"
            onClick={handleRemoveMember}
          >
            Remove
          </LoadingButton>
        </div>
      </DialogContent>
    </Dialog>
  );
};
