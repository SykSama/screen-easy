"use client";

import { LoadingButton } from "@/components/loading-button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { toast } from "sonner";
import { NewOrgFormSchema } from "./new-org-form.schema";
import { createOrgAction } from "./new-org.action";

type NewOrgFormProps = {
  userEmail: string;
  defaultOrgName: string;
};

export const NewOrgForm = ({ userEmail, defaultOrgName }: NewOrgFormProps) => {
  const { form, action, handleSubmitWithAction } = useHookFormAction(
    createOrgAction,
    zodResolver(NewOrgFormSchema),
    {
      formProps: {
        mode: "onChange",
        values: {
          name: defaultOrgName,
          email: userEmail,
        },
      },
      actionProps: {
        onError: (args) => {
          if (!args.error.serverError) {
            return;
          }

          toast.error(args.error.serverError, { position: "top-right" });
        },
      },
    },
  );

  return (
    <div className="flex size-full min-h-[50vh] flex-col items-center justify-center px-4">
      <Card className="mx-auto w-full max-w-lg">
        <CardHeader>
          <CardTitle className="text-2xl">Create Organization</CardTitle>
          <CardDescription>
            Fill in the details to create your new organization.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={handleSubmitWithAction} className="space-y-8">
              <div className="grid gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="grid gap-2">
                      <FormLabel htmlFor="name">Organization Name</FormLabel>
                      <FormControl>
                        <Input id="name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="grid gap-2">
                      <FormLabel htmlFor="email">Contact Email</FormLabel>
                      <FormControl>
                        <Input id="email" type="email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {form.formState.errors.root && (
                  <div className="text-destructive">
                    {form.formState.errors.root.message}
                  </div>
                )}
                <LoadingButton
                  type="submit"
                  className="w-full"
                  isLoading={action.isPending}
                >
                  Create Organization
                </LoadingButton>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};
