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
import { MediasSelectorDialog } from "@/features/medias/components/medias-selector-v2/medias-selector-dialog";
import type { Tables } from "@/types/database.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useHookFormAction } from "@next-safe-action/adapter-react-hook-form/hooks";
import { toast } from "sonner";
import { collectionFormAction } from "./collection-form.action";
import { CollectionFormSchema } from "./collection-form.schema";

export type CollectionFormProps = {
  initialValue?: Tables<"collection_with_medias_v">;
};

export const CollectionForm = ({ initialValue }: CollectionFormProps) => {
  const { form, action, handleSubmitWithAction } = useHookFormAction(
    collectionFormAction,
    zodResolver(CollectionFormSchema),
    {
      formProps: {
        defaultValues: {
          id: initialValue?.id ?? undefined,
          name: initialValue?.name ?? "",
          description: initialValue?.description ?? "",
          medias: initialValue?.medias ?? [],
        },
      },
      actionProps: {
        onSuccess: () => {
          const message = initialValue
            ? "Collection updated successfully"
            : "Collection created successfully";

          toast.success(message);
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
        <h1 className="text-2xl font-bold">
          {initialValue ? "Update Collection" : "Create Collection"}
        </h1>
        <Separator className="my-10 mt-6" />

        {/* Information Section */}
        <FormSection
          title="Information"
          description="Add information about the collection"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <div>
                  <FormLabel>Name</FormLabel>
                  <FormDescription className="text-muted-foreground">
                    Give your collection a name
                  </FormDescription>
                </div>
                <FormControl>
                  <Input
                    className="mt-10"
                    placeholder="My awesome collection"
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
                    Describe what this collection is about
                  </FormDescription>
                </div>
                <FormControl>
                  <Textarea
                    placeholder="This collection contains..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </FormSection>

        <Separator className="my-10" />

        {/* Media Section */}
        <FormSection
          title="Media"
          description="Add and organize media in your collection"
        >
          <MediasSelectorDialog
            enableMultiRowSelection={true}
            onSelect={(medias) => {
              console.log(medias);
            }}
          />
        </FormSection>

        <Separator className="my-10" />
        <div className="flex justify-end gap-4">
          <LoadingButton type="submit" isLoading={action.isPending}>
            {initialValue ? "Update Collection" : "Create Collection"}
          </LoadingButton>
        </div>
      </form>
    </Form>
  );
};
