"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import type { Tables } from "@/types/database.types";
import { useQuery } from "@tanstack/react-query";
import { Check, ImageIcon } from "lucide-react";
import { useState } from "react";
import { useDebounce } from "use-debounce";
import type { MediaWithDuration } from "../../new/create-collection.schema";
import { getMediasQueryClient } from "../queries/get-medias.query.client";

type Media = Tables<"media">;

export type SelectMediasPopupProps = {
  onSelect: (medias: MediaWithDuration[]) => void;
  initalMedias?: MediaWithDuration[];
};

export const SelectMediasPopup = ({
  onSelect,
  initalMedias = [],
}: SelectMediasPopupProps) => {
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 300);
  const [selectedMedias, setSelectedMedias] =
    useState<MediaWithDuration[]>(initalMedias);

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

      return [
        ...currentSelected,
        {
          id: media.id,
          name: media.name,
          duration: 0,
        },
      ];
    });
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

  return (
    <Dialog onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-auto">
          Add medias
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Select Medias</DialogTitle>
          <DialogDescription>
            Select medias to add to the collection
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-4">
          <Input
            placeholder="Search medias..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <ScrollArea className="h-[500px] rounded-md border p-4">
            {isLoading ? (
              <div className="grid grid-cols-3 gap-4">
                {Array.from({ length: 9 }).map((_, i) => (
                  <Skeleton key={i} className="aspect-square" />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-4">
                {medias?.map((media) => (
                  <Button
                    key={media.id}
                    onClick={() => handleSelect(media)}
                    variant="ghost"
                    className={cn(
                      "group relative aspect-square h-auto p-0 overflow-hidden flex flex-col",
                      selectedMedias.some((m) => m.id === media.id) &&
                        "ring-2 ring-primary",
                    )}
                  >
                    <div className="w-full flex-1">
                      {media.type === "image" ? (
                        <div className="flex size-full items-center justify-center bg-muted">
                          <ImageIcon className="size-8 text-muted-foreground" />
                        </div>
                      ) : (
                        <div className="flex h-full items-center justify-center bg-muted">
                          <span className="text-sm text-muted-foreground">
                            {media.type}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="w-full truncate bg-muted/50 p-2 text-center text-xs">
                      {media.name}
                    </div>
                    {selectedMedias.some((m) => m.id === media.id) && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                        <Check className="size-8 text-white" />
                      </div>
                    )}
                  </Button>
                ))}
              </div>
            )}
          </ScrollArea>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <DialogTrigger asChild>
              <Button onClick={handleConfirm}>
                Select ({selectedMedias.length})
              </Button>
            </DialogTrigger>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
};
