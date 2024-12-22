"use client";

import { FormSection } from "@/components/form-section";
import { LoadingButton } from "@/components/loading-button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { CollectionsSelectorDialog } from "@/features/collections/collections-selector/collections-selector-dialog";
import type { GetDeviceOutput } from "@/queries/devices/get-devices.query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useHookFormAction } from "@next-safe-action/adapter-react-hook-form/hooks";
import { toast } from "sonner";
import { updateDeviceAction } from "./device-form.action";
import { DeviceFormSchema } from "./device-form.schema";

export type DeviceFormProps = {
  initialValue: GetDeviceOutput;
};

export const DeviceForm = ({ initialValue }: DeviceFormProps) => {
  const { form, action, handleSubmitWithAction } = useHookFormAction(
    updateDeviceAction,
    zodResolver(DeviceFormSchema),
    {
      formProps: {
        defaultValues: {
          id: initialValue.id,
          name: initialValue.name,
          description: initialValue.description,
          device_group_id: initialValue.device_group_id,
          collection: {
            ...initialValue.collections,
          },
        },
      },
      actionProps: {
        onSuccess: () => {
          toast.success("Device updated successfully");
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
    <Form {...form}>
      <form onSubmit={handleSubmitWithAction} className="mx-auto max-w-4xl">
        <h1 className="text-2xl font-bold">Update Device</h1>
        <Separator className="my-10 mt-6" />

        {/* Information Section */}
        <FormSection
          title="Information"
          description="Add information about the device"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <div>
                  <FormLabel>Name</FormLabel>
                  <FormDescription className="text-muted-foreground">
                    Give your device a descriptive name
                  </FormDescription>
                </div>
                <FormControl>
                  <Input
                    className="mt-10"
                    placeholder="My awesome device"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <div>
                  <FormLabel>Description</FormLabel>
                  <FormDescription>
                    Describe what this device is about
                  </FormDescription>
                </div>
                <FormControl>
                  <Textarea
                    placeholder="This device is..."
                    {...field}
                    value={field.value ?? ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </FormSection>

        <Separator className="my-10" />

        {/* Collection Section */}
        <FormSection
          title="Collection"
          description="Assign this device to a collection"
        >
          <FormField
            control={form.control}
            name="collection"
            render={({ field }) => (
              <FormItem>
                <div>
                  <FormLabel>Collection</FormLabel>
                  <FormDescription>
                    Choose a collection for this device
                  </FormDescription>
                </div>
                <FormControl>
                  <CollectionsSelectorDialog
                    enableMultiRowSelection={false}
                    onSelect={(collections) => {
                      field.onChange(collections[0] ?? null);
                    }}
                    initialSelectedCollections={
                      field.value ? [field.value] : []
                    }
                  />
                </FormControl>
                <FormDescription>
                  {!field.value?.name && "No collection selected"}
                  {field.value?.name &&
                    `1 collection selected: ${field.value.name}`}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </FormSection>

        <Separator className="my-10" />
        <div className="flex justify-end gap-4">
          <LoadingButton type="submit" isLoading={action.isPending}>
            Update Device
          </LoadingButton>
        </div>
      </form>
    </Form>
  );
};
