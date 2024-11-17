"use client";

import { LoadingButton } from "@/components/loading-button";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useHookFormAction } from "@next-safe-action/adapter-react-hook-form/hooks";
import Link from "next/link";
import { toast } from "sonner";
import { updateProfileAction } from "./profile-form.action";
import { ProfileFormSchema } from "./profile-form.schema";

type ProfileFormProps = {
  initialData: {
    email: string;
  };
};

export const ProfileForm = ({ initialData }: ProfileFormProps) => {
  const { form, action, handleSubmitWithAction } = useHookFormAction(
    updateProfileAction,
    zodResolver(ProfileFormSchema),
    {
      formProps: {
        mode: "onChange",
        values: initialData,
      },
      actionProps: {
        onSuccess: () => {
          toast.success(
            "Profile updated successfully. Please check your email to confirm the changes.",
          );
        },
        onError: (args) => {
          if (args.error.serverError) {
            toast.error(args.error.serverError);
          }
        },
      },
    },
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile Information</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={handleSubmitWithAction} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email address</FormLabel>
                  <FormControl>
                    <Input {...field} type="email" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex items-center justify-between">
              <Button variant="outline" type="button" asChild>
                <Link href="/reset-password">Reset password</Link>
              </Button>

              <div className="flex gap-4">
                <Button
                  variant="outline"
                  type="button"
                  onClick={() => form.reset()}
                >
                  Cancel
                </Button>
                <LoadingButton type="submit" isLoading={action.isPending}>
                  Save
                </LoadingButton>
              </div>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
