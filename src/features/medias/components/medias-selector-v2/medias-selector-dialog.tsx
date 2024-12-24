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
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { MediasSelectorTable } from "./medias-selector-table";
import type { MediasSelector } from "./medias-selector.type";

export type MediasSelectorDialogProps = {
  onSelect?: (medias: MediasSelector[]) => void;
  initialSelectedMedias?: MediasSelector[];
  enableMultiRowSelection: boolean;
};

export const MediasSelectorDialog = ({
  onSelect,
  initialSelectedMedias,
  enableMultiRowSelection,
}: MediasSelectorDialogProps) => {
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 500);
  const [selectedMedias, setSelectedMedias] = useState<MediasSelector[]>(
    initialSelectedMedias ?? [],
  );

  useEffect(() => {
    setSelectedMedias(initialSelectedMedias ?? []);
  }, [initialSelectedMedias]);

  const buttonTriggerTitle =
    selectedMedias.length > 0
      ? `Medias (${selectedMedias.length})`
      : "Select medias";

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">{buttonTriggerTitle}</Button>
      </DialogTrigger>
      <DialogContent className="max-w-5xl">
        <DialogHeader>
          <DialogTitle>Select Medias</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Select a media to add to this device
        </DialogDescription>
        <div className="space-y-4">
          <Input
            placeholder="Search medias..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            autoFocus={true}
          />
          <ScrollArea className="h-[600px]">
            <MediasSelectorTable
              onSelect={setSelectedMedias}
              search={debouncedSearch}
              initialSelectedMedias={selectedMedias}
              enableMultiRowSelection={enableMultiRowSelection}
            />
          </ScrollArea>
        </div>
        <DialogClose asChild>
          <Button onClick={() => onSelect?.(selectedMedias)}>
            {`Select (${selectedMedias.length})`}
          </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};
