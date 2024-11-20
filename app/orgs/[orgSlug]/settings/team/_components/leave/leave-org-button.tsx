"use client";

import { LoadingButton } from "@/components/loading-button";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";
import { leaveOrgAction } from "./leave-org.action";

export const LeaveOrganizationButton = () => {
  const { executeAsync, isPending } = useAction(leaveOrgAction);

  const handleLeave = async () => {
    const result = await executeAsync({});

    if (!result) {
      return;
    }

    if (result.serverError) {
      toast.error(result.serverError);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline-destructive" size="xs">
          Leave organization
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Leave organization</DialogTitle>
          <DialogDescription>
            Are you sure you want to leave this organization? This action cannot
            be undone.
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-end gap-2">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
          <LoadingButton
            variant="destructive"
            isLoading={isPending}
            onClick={handleLeave}
          >
            Leave
          </LoadingButton>
        </div>
      </DialogContent>
    </Dialog>
  );
};
