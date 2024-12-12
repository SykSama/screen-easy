"use client";

import { Button } from "@/components/ui/button";
import { FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Sortable,
  SortableDragHandle,
  SortableItem,
} from "@/components/ui/sortable";
import { Typography } from "@/components/ui/typography";
import { MediasSelector } from "@/features/medias/components/medias-selector";
import type { Tables } from "@/types/database.types";
import { GripVertical, TrashIcon } from "lucide-react";
import type { UseFormReturn } from "react-hook-form";
import { useFieldArray } from "react-hook-form";
import type { CreateCollectionFormValues } from "../new/create-collection.schema";

export type MediasSelectorFieldProps = {
  form: UseFormReturn<CreateCollectionFormValues>;
};

export const MediasSelectorField = ({ form }: MediasSelectorFieldProps) => {
  const { fields, append, remove, move } = useFieldArray({
    control: form.control,
    name: "medias",
    keyName: "fieldId",
  });

  const handleMediaSelection = (medias: Tables<"media">[]) => {
    const currentIds = fields.map((field) => field.id);

    [...fields].reverse().forEach((field, idx) => {
      const reverseIndex = fields.length - 1 - idx;
      if (!medias.some((media) => media.id === field.id)) {
        remove(reverseIndex);
      }
    });

    medias.forEach((media) => {
      if (!currentIds.includes(media.id)) {
        append({
          ...media,
          duration: 0,
        });
      }
    });
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-end">
        <MediasSelector initalMedias={fields} onSelect={handleMediaSelection} />
      </div>
      <Sortable
        value={fields}
        onMove={({ activeIndex, overIndex }) => move(activeIndex, overIndex)}
        overlay={
          <div className="grid grid-cols-[0.5fr,1fr,auto,auto] items-center gap-2">
            <div className="h-8 w-full rounded-sm bg-primary/10" />
            <div className="size-8 shrink-0 rounded-sm bg-primary/10" />
            <div className="size-8 shrink-0 rounded-sm bg-primary/10" />
            <div className="size-8 shrink-0 rounded-sm bg-primary/10" />
          </div>
        }
      >
        <div className="flex w-full flex-col gap-2">
          {fields.map((field, index) => (
            <SortableItem key={field.id} value={field.id} asChild>
              <div className="grid grid-cols-[1fr,0.5fr,auto,auto] items-center gap-2">
                <Typography variant="default" className="w-full">
                  {field.name}
                </Typography>

                <FormField
                  control={form.control}
                  name={`medias.${index}.duration`}
                  render={({ field }) => (
                    <FormItem className="w-full">
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
