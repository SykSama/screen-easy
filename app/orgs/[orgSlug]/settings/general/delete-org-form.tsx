"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Icons } from "@/components/ui/icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { useHookFormAction } from "@next-safe-action/adapter-react-hook-form/hooks";
import { useRouter } from "next/navigation";
import { DeleteOrgSchema } from "./general-settings-form.schema";
import { deleteOrgAction } from "./general-settings.action";

export const DeleteOrgForm = () => {
  const router = useRouter();
  const { action, handleSubmitWithAction } = useHookFormAction(
    deleteOrgAction,
    zodResolver(DeleteOrgSchema),
    {
      actionProps: {
        onSuccess: () => {
          router.push("/orgs/new");
        },
      },
    },
  );

  return (
    <Card className="border-destructive">
      <CardHeader>
        <CardTitle className="text-destructive">DANGER ZONE</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-lg border-2 border-destructive/50 p-4">
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <h4 className="font-medium">
                Deleting this organization will also remove its projects
              </h4>
              <p className="text-sm text-muted-foreground">
                Make sure you have made a backup of your projects if you want to
                keep your data
              </p>
            </div>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive">Delete organization</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    your organization and remove all associated data.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={async () => {
                      await handleSubmitWithAction();
                    }}
                    className="bg-destructive hover:bg-destructive/90"
                    disabled={action.isPending}
                  >
                    <>
                      {action.isPending && (
                        <Icons.spinner className="mr-2 size-4 animate-spin" />
                      )}
                      Delete
                    </>
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
