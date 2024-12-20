"use client";

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import type { GetDeviceOutput } from "@/queries/devices/get-devices.query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useHookFormAction } from "@next-safe-action/adapter-react-hook-form/hooks";
import { toast } from "sonner";
import { updateDeviceAction } from "./device-form.action";
import { DeviceFormSchema } from "./device-form.schema";

export type CollectionOption = {
  label: string;
  value: string;
};

export type DeviceFormProps = {
  initialValue: GetDeviceOutput;
  collections: CollectionOption[];
};

export const DeviceForm = ({ initialValue, collections }: DeviceFormProps) => {
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
          collection_id: initialValue.collection_id,
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
      <form
        onSubmit={handleSubmitWithAction}
        className="w-full max-w-2xl space-y-4"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter device name" {...field} />
              </FormControl>
              <FormDescription>
                This is the display name of your device.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter device description"
                  {...field}
                  value={field.value ?? ""}
                />
              </FormControl>
              <FormDescription>
                Optional description for your device.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* <FormField
          control={form.control}
          name="device_group_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Device Group</FormLabel>
              <Select
                onValueChange={field.onChange}
                value={field.value ?? undefined}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a device group" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="">None</SelectItem>
                  {deviceGroups.map((group) => (
                    <SelectItem key={group.id} value={group.id}>
                      {group.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>Optional group for your device.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        /> */}

        <FormField
          control={form.control}
          name="collection_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Collection</FormLabel>
              <Select
                onValueChange={field.onChange}
                value={field.value ?? undefined}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a collection" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {collections.map((collection) => (
                    <SelectItem key={collection.value} value={collection.value}>
                      {collection.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>
                Optional collection for your device.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <LoadingButton
          type="submit"
          isLoading={action.isPending}
          className="self-end"
        >
          Update Device
        </LoadingButton>
      </form>
    </Form>
  );
};
