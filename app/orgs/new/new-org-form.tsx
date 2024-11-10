"use client";

import { Button } from "@/components/ui/button";
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
import { NewOrgFormSchema } from "./new-org-form.schema";
import { createOrgAction } from "./new-org.action";

export const NewOrgForm = () => {
  const { form, action, handleSubmitWithAction } = useHookFormAction(
    createOrgAction,
    zodResolver(NewOrgFormSchema),
    {
      formProps: {
        mode: "onChange",
        values: {
          name: "",
          email: "",
          slug: "",
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
                        <Input id="name" placeholder="Acme Corp" {...field} />
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
                        <Input
                          id="email"
                          type="email"
                          placeholder="contact@acme.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="slug"
                  render={({ field }) => (
                    <FormItem className="grid gap-2">
                      <FormLabel htmlFor="slug">Organization URL</FormLabel>
                      <FormControl>
                        <div className="flex items-center">
                          <span className="mr-2 text-sm text-muted-foreground">
                            orgs/
                          </span>
                          <Input id="slug" placeholder="acme" {...field} />
                        </div>
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
                <Button type="submit" className="w-full">
                  {action.isPending ? "Creating..." : "Create Organization"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};
