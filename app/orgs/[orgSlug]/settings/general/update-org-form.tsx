"use client";

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
import type { Tables } from "@/types/database.generated.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useHookFormAction } from "@next-safe-action/adapter-react-hook-form/hooks";
import { toast } from "sonner";
import { GeneralSettingsFormSchema } from "./general-settings-form.schema";
import { updateOrgSettingsAction } from "./general-settings.action";

export type GeneralSettingsFormProps = {
  initialData: Pick<Tables<"organizations">, "id" | "name" | "slug">;
};

export const UpdateOrgForm = ({ initialData }: GeneralSettingsFormProps) => {
  const { form, action, handleSubmitWithAction } = useHookFormAction(
    updateOrgSettingsAction,
    zodResolver(GeneralSettingsFormSchema),
    {
      formProps: {
        mode: "onChange",
        values: {
          name: initialData.name,
          slug: initialData.slug,
          orgId: initialData.id,
        },
      },
      actionProps: {
        onSuccess: () => {
          toast.info("Organization updated successfully");
        },
        onError: (args) => {
          toast.error(args.error.serverError ?? "Error updating organization");
        },
      },
    },
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>General settings</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={handleSubmitWithAction} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Organization name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="slug"
              disabled={true}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Organization slug</FormLabel>
                  <FormControl>
                    <div className="flex items-center gap-2">
                      <Input {...field} />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={async () => {
                          await navigator.clipboard.writeText(
                            field.value ?? "",
                          );
                        }}
                      >
                        Copy
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-4">
              <Button
                variant="outline"
                type="button"
                onClick={() => form.reset()}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={action.isPending}>
                {action.isPending ? "Saving..." : "Save"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
