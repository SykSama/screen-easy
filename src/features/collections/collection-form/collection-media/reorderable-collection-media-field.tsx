"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";

import { FormControl, FormField } from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ResizeModeSchema } from "@/features/medias/types";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";
import { Reorder } from "framer-motion";
import { GripVertical, Info, Trash2 } from "lucide-react";
import Image from "next/image";
import { useFieldArray, useFormContext } from "react-hook-form";
import type { CreateCollectionFormValues } from "../collection-form.schema";

export const ReorderableCollectionMediaField = () => {
  const form = useFormContext<CreateCollectionFormValues>();

  const { fields, swap, remove } = useFieldArray({
    control: form.control,
    name: "medias",
    keyName: "fieldId",
  });

  const reorderList = (newFields: typeof fields) => {
    const firstDiffIndex = fields.findIndex(
      (field, index) => field.fieldId !== newFields[index].fieldId,
    );

    if (firstDiffIndex !== -1) {
      const newIndex = newFields.findIndex(
        (field) => field.fieldId === fields[firstDiffIndex].fieldId,
      );

      swap(firstDiffIndex, newIndex);
    }
  };

  return (
    <TooltipProvider>
      <div className="mx-auto w-full max-w-5xl">
        <div className="mb-6">
          <div className="grid grid-cols-[40px_80px_1fr_120px_140px_40px] items-center gap-4">
            <div className="w-5" /> {/* Drag handle space */}
            <div /> {/* Empty space for image column */}
            <div /> {/* Empty space for content column */}
            <div className="flex items-center justify-end gap-2">
              <Label className="text-sm text-muted-foreground">Duration</Label>
              <Tooltip>
                <TooltipTrigger>
                  <Info className="size-4 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Display time in seconds for each item</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <div className="flex items-center gap-2">
              <Label className="text-sm text-muted-foreground">
                Resize Mode
              </Label>
              <Tooltip>
                <TooltipTrigger>
                  <Info className="size-4 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent className="max-w-xs">
                  <p>How the content should be resized:</p>
                  <ul className="ml-4 mt-1 list-disc text-sm">
                    <li>Cover: Fill while maintaining aspect ratio</li>
                    <li>Contain: Show all content within bounds</li>
                    <li>Fill: Stretch to fill the space</li>
                  </ul>
                </TooltipContent>
              </Tooltip>
            </div>
            <div /> {/* Delete button space */}
          </div>
        </div>
        <Reorder.Group
          axis="y"
          values={fields}
          onReorder={reorderList}
          className="space-y-3"
        >
          {fields.map((item, index) => (
            <Reorder.Item
              key={item.fieldId}
              value={item}
              className="cursor-move list-none"
            >
              <div className="group relative rounded-lg bg-card p-4 transition-colors hover:bg-accent/50">
                <div className="grid grid-cols-[40px_48px_1fr_120px_140px_40px] items-center gap-4">
                  <div className="cursor-move text-muted-foreground hover:text-foreground">
                    <GripVertical className="size-5" />
                  </div>

                  <div className="relative overflow-hidden rounded-md">
                    <Image
                      src="/images/placeholder-media.svg"
                      alt={item.name}
                      width={48}
                      height={48}
                      className="size-12 object-contain"
                    />
                  </div>

                  <div className="min-w-0">
                    <h3 className="truncate font-semibold">{item.name}</h3>
                    <p className="truncate text-sm text-muted-foreground">
                      {item.description}
                    </p>
                  </div>

                  <FormField
                    control={form.control}
                    name={`medias.${index}.duration`}
                    render={({ field }) => (
                      <FormControl>
                        <Input
                          type="number"
                          className="h-8"
                          {...field}
                          onKeyDown={(e) => {
                            if (e.key === "e" || e.key === "E") {
                              e.preventDefault();
                            }
                          }}
                          onChange={(e) => {
                            field.onChange(e.target.value);
                          }}
                        />
                      </FormControl>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`medias.${index}.resize_mode`}
                    render={({ field }) => (
                      <FormControl>
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger className="h-9">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {ResizeModeSchema.options.map((mode) => (
                              <SelectItem key={mode} value={mode}>
                                {mode}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                    )}
                  />

                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => remove(index)}
                    className="opacity-0 transition-opacity group-hover:opacity-100"
                  >
                    <Trash2 className="size-4 text-destructive" />
                    <span className="sr-only">Delete item</span>
                  </Button>
                </div>
              </div>
            </Reorder.Item>
          ))}
        </Reorder.Group>
      </div>
    </TooltipProvider>
  );
};
