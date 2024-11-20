"use client";

import { Button } from "@/components/ui/button";
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
import { resetPasswordAction } from "./reset-password.action";
import { ResetPasswordSchema } from "./reset-password.schema";

export const ResetPasswordForm = () => {
  const { form, action, handleSubmitWithAction } = useHookFormAction(
    resetPasswordAction,
    zodResolver(ResetPasswordSchema),
    {
      formProps: {
        mode: "onChange",
        values: {
          password: "",
          confirmPassword: "",
        },
      },
    },
  );

  return (
    <div className="flex w-[330px] flex-1 flex-col justify-center sm:w-[384px]">
      <div className="mb-10">
        <h1 className="mb-2 mt-8 text-2xl lg:text-3xl">Reset Password</h1>
        <h2 className="text-foreground-light text-sm">
          Please enter your new password
        </h2>
      </div>

      <Form {...form}>
        <form onSubmit={handleSubmitWithAction} className="flex flex-col gap-4">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="grid gap-2">
                <FormLabel htmlFor="password">New Password</FormLabel>
                <FormControl>
                  <Input
                    id="password"
                    type="password"
                    placeholder="******"
                    autoComplete="new-password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem className="grid gap-2">
                <FormLabel htmlFor="confirmPassword">
                  Confirm Password
                </FormLabel>
                <FormControl>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="******"
                    autoComplete="new-password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full">
            {action.isPending ? "Updating..." : "Update Password"}
          </Button>
        </form>
      </Form>
    </div>
  );
};
