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
import { Separator } from "@/components/ui/separator";
import type { CollectionSelector } from "@/features/collections/collections-selector/collection-selector.type";
import { CollectionsSelectorDialog } from "@/features/collections/collections-selector/collections-selector-dialog";
import { MediaPreviewClient } from "@/features/medias/components/media-preview/media-preview-client";
import type { Tables } from "@/types/database.generated.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useHookFormAction } from "@next-safe-action/adapter-react-hook-form/hooks";
import { useState } from "react";
import { toast } from "sonner";
import { updateMediaAction } from "./update-media.action";
import { UpdateMediaFormSchema } from "./update-media.schema";

type Media = Tables<"media">;

type UpdateMediaFormProps = {
  media: Media;
  initialCollections: CollectionSelector[];
};

export const UpdateMediaForm = ({
  media,
  initialCollections,
}: UpdateMediaFormProps) => {
  const [selectedCollections, setSelectedCollections] =
    useState<CollectionSelector[]>(initialCollections);

  const { form, action, handleSubmitWithAction } = useHookFormAction(
    updateMediaAction,
    zodResolver(UpdateMediaFormSchema),
    {
      formProps: {
        defaultValues: {
          id: media.id,
          name: media.name,
          description: media.description ?? "",
          collectionIds: initialCollections.map((c) => c.id),
        },
      },
      actionProps: {
        onSuccess: () => {
          toast.success("Media updated successfully");
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
    <div className="flex gap-8">
      {/* Image Preview */}
      <div className="w-1/2">
        <div className="sticky top-4 overflow-hidden rounded-lg border">
          <MediaPreviewClient
            media={media}
            imageProps={{ width: 800, height: 800 }}
          />
        </div>
      </div>

      {/* Form */}
      <div className="w-1/2">
        <Form {...form}>
          <form onSubmit={handleSubmitWithAction}>
            <div className="space-y-8">
              <div>
                <h2 className="text-lg font-medium">Media Information</h2>
                <p className="text-sm text-muted-foreground">
                  Update your media details
                </p>
              </div>

              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <div>
                        <FormLabel>Name</FormLabel>
                        <FormDescription>
                          This is your public display name.
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Input placeholder="My beautiful media" {...field} />
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
                          A brief description of your media.
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Input placeholder="Add a description" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Separator />

              <FormField
                control={form.control}
                name="collectionIds"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center justify-between">
                      <div>
                        <FormLabel>Collections</FormLabel>
                        <FormDescription>
                          Select collections to add this media to.
                        </FormDescription>
                      </div>
                      <FormControl>
                        <CollectionsSelectorDialog
                          initialSelectedCollections={selectedCollections}
                          enableMultiRowSelection={true}
                          onSelect={(collections) => {
                            setSelectedCollections(collections);
                            field.onChange(collections.map((c) => c.id));
                          }}
                        />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end">
                <LoadingButton type="submit" isLoading={action.isPending}>
                  Update
                </LoadingButton>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};
