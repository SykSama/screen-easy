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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Tables } from "@/types/database.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useHookFormAction } from "@next-safe-action/adapter-react-hook-form/hooks";
import { toast } from "sonner";
import { inviteMemberAction } from "./invite-member.action";
import { InviteMemberSchema } from "./invite-member.schema";

type InviteMemberFormProps = {
  roles: Tables<"membership_roles">[];
  onSuccess?: () => void;
};

export const InviteMemberForm = ({
  roles,
  onSuccess,
}: InviteMemberFormProps) => {
  const { form, action, handleSubmitWithAction } = useHookFormAction(
    inviteMemberAction,
    zodResolver(InviteMemberSchema),
    {
      formProps: {
        defaultValues: {
          email: "",
          roleId: roles[0].id,
        },
      },
      actionProps: {
        onSuccess: () => {
          toast.success("Invitation sent successfully");
          onSuccess?.();
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
      <form onSubmit={handleSubmitWithAction} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email address</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter email address"
                  type="email"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="roleId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Member role</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {roles.map((role) => (
                    <SelectItem key={role.id} value={role.id}>
                      {role.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={action.isPending}>
          {action.isPending ? "Sending invitation..." : "Send invitation"}
        </Button>
      </form>
    </Form>
  );
};
