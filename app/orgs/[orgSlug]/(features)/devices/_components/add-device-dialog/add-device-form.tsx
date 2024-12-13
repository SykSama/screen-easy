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
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { zodResolver } from "@hookform/resolvers/zod";
import { useHookFormAction } from "@next-safe-action/adapter-react-hook-form/hooks";
import { toast } from "sonner";
import { addDeviceAction } from "./add-device.action";
import { AddDeviceFormSchema } from "./add-device.schema";

export const AddDeviceForm = () => {
  const { form, action, handleSubmitWithAction } = useHookFormAction(
    addDeviceAction,
    zodResolver(AddDeviceFormSchema),
    {
      formProps: {
        defaultValues: {
          code: "",
        },
      },
      actionProps: {
        onSuccess: () => {
          toast.success("Device added successfully");
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
      <form onSubmit={handleSubmitWithAction} className="w-full space-y-6">
        <FormField
          control={form.control}
          name="code"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Device Code</FormLabel>
              <FormControl>
                <InputOTP maxLength={6} {...field}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                  </InputOTPGroup>

                  <InputOTPSeparator />

                  <InputOTPGroup>
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>
              <FormDescription>
                Please enter the 6-digit code of your device.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <LoadingButton
          type="submit"
          isLoading={action.isPending}
          className="w-full"
        >
          Add Device
        </LoadingButton>
      </form>
    </Form>
  );
};
