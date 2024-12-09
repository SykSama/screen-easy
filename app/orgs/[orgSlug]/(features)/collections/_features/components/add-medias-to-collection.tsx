"use client";

import { Button } from "@/components/ui/button";
import { FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Sortable,
  SortableDragHandle,
  SortableItem,
} from "@/components/ui/sortable";
import { GripVertical, TrashIcon } from "lucide-react";
import type { UseFormReturn } from "react-hook-form";
import { useFieldArray } from "react-hook-form";
import type {
  CreateCollectionFormValues,
  MediaWithDuration,
} from "../../new/create-collection.schema";

import { MediasSelector } from "./medias-selector";

export type AddMediasToCollectionProps = {
  form: UseFormReturn<CreateCollectionFormValues>;
};

export const AddMediasToCollection = ({ form }: AddMediasToCollectionProps) => {
  const { fields, append, remove, move } = useFieldArray({
    control: form.control,
    name: "medias",
    keyName: "fieldId",
  });

  const selectedMedias = fields.map((field) => ({
    id: field.id,
    name: field.name,
    duration: field.duration,
  }));

  const handleMediaSelection = (medias: MediaWithDuration[]) => {
    const currentIds = fields.map((f) => f.id);

    [...fields].reverse().forEach((field, idx) => {
      const reverseIndex = fields.length - 1 - idx;
      if (!medias.some((media) => media.id === field.id)) {
        remove(reverseIndex);
      }
    });

    medias.forEach((media) => {
      if (!currentIds.includes(media.id)) {
        append({
          id: media.id,
          name: media.name,
          duration: media.duration,
        });
      }
    });
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-end">
        <MediasSelector
          initalMedias={selectedMedias}
          onSelect={handleMediaSelection}
        />
      </div>
      <Sortable
        value={fields}
        onMove={({ activeIndex, overIndex }) => move(activeIndex, overIndex)}
        overlay={
          <div className="grid grid-cols-[0.5fr,1fr,auto,auto] items-center gap-2">
            <div className="h-8 w-full rounded-sm bg-primary/10" />
            <div className="h-8 w-full rounded-sm bg-primary/10" />
            <div className="size-8 shrink-0 rounded-sm bg-primary/10" />
            <div className="size-8 shrink-0 rounded-sm bg-primary/10" />
          </div>
        }
      >
        <div className="flex w-full flex-col gap-2">
          {fields.map((field, index) => (
            <SortableItem key={field.id} value={field.id} asChild>
              <div className="grid grid-cols-[0.5fr,1fr,auto,auto] items-center gap-2">
                <FormField
                  control={form.control}
                  name={`medias.${index}.name`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input className="h-8" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`medias.${index}.duration`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          type="number"
                          className="h-8"
                          {...field}
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <SortableDragHandle
                  variant="outline"
                  size="icon"
                  className="size-8 shrink-0"
                >
                  <GripVertical className="size-4" aria-hidden="true" />
                </SortableDragHandle>
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="size-8 shrink-0"
                  onClick={() => remove(index)}
                >
                  <TrashIcon
                    className="size-4 text-destructive"
                    aria-hidden="true"
                  />
                  <span className="sr-only">Remove</span>
                </Button>
              </div>
            </SortableItem>
          ))}
        </div>
      </Sortable>
    </div>
  );
};
