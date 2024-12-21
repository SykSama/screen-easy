"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { Tables } from "@/types";
import { useEffect, useState } from "react";
import { CollectionsSelectorTable } from "./collections-selector-table";

type Collection = Tables<"collections">;

export type CollectionsSelectorDialogProps = {
  onSelect?: (collections: Collection[]) => void;
  trigger?: React.ReactNode;
};

export const CollectionsSelectorDialog = ({
  onSelect,
  trigger,
}: CollectionsSelectorDialogProps) => {
  const [selectedCollections, setSelectedCollections] = useState<Collection[]>(
    [],
  );
  const [search, setSearch] = useState("");

  // Notify parent component of selection changes
  useEffect(() => {
    onSelect?.(selectedCollections);
  }, [selectedCollections, onSelect]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger ?? <Button variant="outline">Select Collections</Button>}
      </DialogTrigger>
      <DialogContent className="max-w-5xl">
        <DialogHeader>
          <DialogTitle>Select Collections</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            placeholder="Search collections..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <ScrollArea className="h-[600px]">
            <CollectionsSelectorTable
              onSelect={setSelectedCollections}
              search={search}
              initialSelectedCollections={selectedCollections}
            />
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  );
};
