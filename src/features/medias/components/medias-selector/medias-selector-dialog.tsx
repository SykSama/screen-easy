"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useQuery } from "@tanstack/react-query";
import { LayoutGrid, Search, TableIcon } from "lucide-react";
import { useState } from "react";
import { useDebounce } from "use-debounce";
import { getMediasQueryClient } from "../../queries/get-medias.query.client";
import type { Media } from "../../types";
import { GridLayout } from "./grid-layout";
import { SelectedMedias } from "./selected-medias";
import { TableLayout } from "./table-layout";

export type MediasSelectorDialogProps = {
  onSelect: (medias: Media[]) => void;
  initalMedias?: Media[];
};

export const MediasSelectorDialog = ({
  onSelect,
  initalMedias = [],
}: MediasSelectorDialogProps) => {
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 300);
  const [isGridView, setIsGridView] = useState(true);
  const [selectedMedias, setSelectedMedias] = useState<Media[]>(initalMedias);

  const { data: medias, isLoading } = useQuery({
    queryKey: ["medias", debouncedSearch],
    queryFn: async () => getMediasQueryClient(debouncedSearch),
  });

  const handleSelect = (media: Media) => {
    setSelectedMedias((currentSelected) => {
      const isAlreadySelected = currentSelected.some((m) => m.id === media.id);

      if (isAlreadySelected) {
        return currentSelected.filter((m) => m.id !== media.id);
      }

      return [...currentSelected, media];
    });
  };

  const handleRemove = (mediaId: string) => {
    setSelectedMedias((current) => current.filter((m) => m.id !== mediaId));
  };

  const handleConfirm = () => {
    onSelect(selectedMedias);
  };

  const onOpenChange = (open: boolean) => {
    if (!open) {
      setSearch("");
      setSelectedMedias([]);
    } else {
      setSelectedMedias(initalMedias);
    }
  };

  const selectedMediaIds = new Set(selectedMedias.map((m) => m.id));

  return (
    <Dialog onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-auto">
          Add medias
        </Button>
      </DialogTrigger>
      <DialogContent className="flex max-h-[90vh] flex-col gap-0 sm:max-w-[900px]">
        <DialogHeader className="border-b px-6 py-4">
          <DialogTitle>Select Medias</DialogTitle>
          <p className="text-sm text-muted-foreground">
            Select medias to add to the collection
          </p>
        </DialogHeader>
        <div className="flex items-center justify-between border-b px-6 py-4">
          <div className="relative mr-4 flex-1">
            <Search className="absolute left-3 top-2.5 size-4 text-muted-foreground" />
            <Input
              placeholder="Search medias..."
              className="pl-9"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="flex space-x-2">
            <Button
              variant={isGridView ? "default" : "outline"}
              size="sm"
              onClick={() => setIsGridView(true)}
            >
              <LayoutGrid className="mr-2 size-4" />
              Grid Layout
            </Button>
            <Button
              variant={!isGridView ? "default" : "outline"}
              size="sm"
              onClick={() => setIsGridView(false)}
            >
              <TableIcon className="mr-2 size-4" />
              Table
            </Button>
          </div>
        </div>
        <ScrollArea className="h-full max-h-screen overflow-y-auto">
          <div className="p-6">
            {isGridView ? (
              <GridLayout
                medias={medias ?? []}
                selectedMediaIds={selectedMediaIds}
                onSelect={(mediaId) => {
                  const media = medias?.find((m) => m.id === mediaId);
                  if (media) handleSelect(media);
                }}
                isLoading={isLoading}
              />
            ) : (
              <TableLayout
                medias={medias ?? []}
                selectedMediaIds={selectedMediaIds}
                onSelect={(mediaId) => {
                  const media = medias?.find((m) => m.id === mediaId);
                  if (media) handleSelect(media);
                }}
                isLoading={isLoading}
              />
            )}
          </div>
        </ScrollArea>
        <SelectedMedias medias={selectedMedias} onRemove={handleRemove} />

        <div className="flex items-center justify-end gap-4 border-t px-6 py-4">
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <DialogTrigger asChild>
            <Button
              onClick={handleConfirm}
              disabled={selectedMedias.length === 0}
            >
              Select ({selectedMedias.length})
            </Button>
          </DialogTrigger>
        </div>
      </DialogContent>
    </Dialog>
  );
};
