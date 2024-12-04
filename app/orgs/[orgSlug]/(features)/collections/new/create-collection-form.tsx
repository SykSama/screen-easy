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
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useHookFormAction } from "@next-safe-action/adapter-react-hook-form/hooks";
import { toast } from "sonner";
import { createCollectionAction } from "./create-collection.action";
import { CreateCollectionFormSchema } from "./create-collection.schema";

export const CreateCollectionForm = () => {
  const { form, action, handleSubmitWithAction } = useHookFormAction(
    createCollectionAction,
    zodResolver(CreateCollectionFormSchema),
    {
      formProps: {
        defaultValues: {
          name: "",
          description: "",
        },
      },
      actionProps: {
        onSuccess: () => {
          toast.success("Collection created successfully");
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
        className="w-full max-w-xl space-y-4"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter collection name" {...field} />
              </FormControl>
              <FormDescription>
                Give your collection a descriptive name
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
                  placeholder="Enter collection description"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Describe what this collection is about
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end">
          <LoadingButton
            type="submit"
            isLoading={action.isPending}
            className="self-end"
          >
            Create Collection
          </LoadingButton>
        </div>
      </form>
    </Form>
  );
};
