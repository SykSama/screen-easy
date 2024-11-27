"use client";

import {
  FormSection,
  FormSectionHeader,
  FormSectionSide,
} from "@/components/form-section";
import { LoadingButton } from "@/components/loading-button";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import type { Tables } from "@/types/database.types";
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
        },
      },
      actionProps: {
        onSuccess: () => {
          toast.info("Organization updated successfully");
        },
        onError: (args) => {
          if (!args.error.serverError) return;
          toast.error(args.error.serverError);
        },
      },
    },
  );

  return (
    <Form {...form}>
      <form onSubmit={handleSubmitWithAction}>
        <FormSection>
          <FormSectionSide col={4}>
            <FormSectionHeader
              title="Organization Details"
              description="Update your organization information and settings."
            />
          </FormSectionSide>

          <FormSectionSide col={8} className="space-y-4">
            <Card>
              <CardContent className="flex flex-col gap-8 p-8">
                <div className="flex flex-col gap-2">
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
                              onClick={async () =>
                                navigator.clipboard.writeText(field.value ?? "")
                              }
                            >
                              Copy
                            </Button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex justify-end gap-4">
                  <Button
                    variant="outline"
                    type="button"
                    onClick={() => form.reset()}
                  >
                    Cancel
                  </Button>
                  <LoadingButton type="submit" isLoading={action.isPending}>
                    Save changes
                  </LoadingButton>
                </div>
              </CardContent>
            </Card>
          </FormSectionSide>
        </FormSection>
      </form>
    </Form>
  );
};
