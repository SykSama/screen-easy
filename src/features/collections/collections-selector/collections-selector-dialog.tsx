"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";
import { useDebounce } from "use-debounce";
import type { CollectionSelector } from "./collection-selector.type";
import { CollectionsSelectorTable } from "./collections-selector-table";

export type CollectionsSelectorDialogProps = {
  onSelect?: (collections: CollectionSelector[]) => void;
  initialSelectedCollections?: CollectionSelector[];
  enableMultiRowSelection: boolean;
};

export const CollectionsSelectorDialog = ({
  onSelect,
  initialSelectedCollections,
  enableMultiRowSelection,
}: CollectionsSelectorDialogProps) => {
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 500);
  const [selectedCollections, setSelectedCollections] = useState<
    CollectionSelector[]
  >(initialSelectedCollections ?? []);

  const buttonTriggerTitle =
    selectedCollections.length > 0
      ? `Collections (${selectedCollections.length})`
      : "Select collections";

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">{buttonTriggerTitle}</Button>
      </DialogTrigger>
      <DialogContent className="max-w-5xl">
        <DialogHeader>
          <DialogTitle>Select Collections</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Select a collection to add to this device
        </DialogDescription>
        <div className="space-y-4">
          <Input
            placeholder="Search collections..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            autoFocus={true}
          />
          <ScrollArea className="h-[600px]">
            <CollectionsSelectorTable
              onSelect={setSelectedCollections}
              search={debouncedSearch}
              initialSelectedCollections={selectedCollections}
              enableMultiRowSelection={enableMultiRowSelection}
            />
          </ScrollArea>
        </div>
        <DialogClose asChild>
          <Button onClick={() => onSelect?.(selectedCollections)}>
            Valider
          </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};
