"use client";

import { MediaPreview } from "@/app/orgs/[orgSlug]/(features)/medias/[mediaId]/_components/media-preview-client";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import type { Tables } from "@/types/database.types";
import { useQuery } from "@tanstack/react-query";
import { Badge, LayoutGrid, Plus, Search, TableIcon, X } from "lucide-react";
import { useState } from "react";
import { useDebounce } from "use-debounce";
import type { MediaWithDuration } from "../../new/create-collection.schema";
import { getMediasQueryClient } from "../queries/get-medias.query.client";

const tags = ["tag1", "tag2", "tag3", "tag4", "tag5"];

type Media = Tables<"media">;

type GridLayoutProps = {
  medias: Media[] | undefined;
  selectedMedias: MediaWithDuration[];
  onSelect: (media: Media) => void;
  isLoading: boolean;
};

const GridLayout = ({
  medias,
  selectedMedias,
  onSelect,
  isLoading,
}: GridLayoutProps) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 9 }).map((_, i) => (
          <Skeleton key={i} className="aspect-square" />
        ))}
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {medias?.map((media) => (
          <div
            key={media.id}
            onClick={() => onSelect(media)}
            className={cn(
              "group relative cursor-pointer overflow-hidden rounded-lg border bg-muted transition-all hover:opacity-90",
              selectedMedias.some((m) => m.id === media.id) &&
                "ring-2 ring-primary ring-offset-2",
            )}
          >
            <div className="relative aspect-[2/3]">
              <MediaPreview media={media} />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-2">
              <h3 className="mb-1 truncate text-sm font-semibold text-white">
                {media.name}
              </h3>
              <div className="flex flex-wrap gap-1">
                {tags.slice(0, 1).map((tag, index) => (
                  <Badge key={index} className="px-1 py-0 text-xs">
                    {tag}
                  </Badge>
                ))}
                {tags.length > 1 && (
                  <Badge className="px-1 py-0 text-xs">
                    <Plus className="mr-0.5 size-2" />
                    {tags.length - 1}
                  </Badge>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

type TableLayoutProps = {
  medias: Media[] | undefined;
  selectedMedias: MediaWithDuration[];
  onSelect: (media: Media) => void;
  isLoading: boolean;
};

const TableLayout = ({
  medias,
  selectedMedias,
  onSelect,
  isLoading,
}: TableLayoutProps) => {
  if (isLoading) {
    return (
      <div className="space-y-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-16 w-full" />
        ))}
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Preview</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Select</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {medias?.map((media) => (
          <TableRow key={media.id}>
            <TableCell>
              <div className="size-16 overflow-hidden rounded">
                <MediaPreview
                  media={media}
                  transform={{
                    width: 64,
                    height: 64,
                    resize: "cover",
                  }}
                />
              </div>
            </TableCell>
            <TableCell className="font-medium">{media.name}</TableCell>
            <TableCell>
              <Button
                variant={
                  selectedMedias.some((m) => m.id === media.id)
                    ? "default"
                    : "outline"
                }
                size="sm"
                onClick={() => onSelect(media)}
              >
                {selectedMedias.some((m) => m.id === media.id)
                  ? "Selected"
                  : "Select"}
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

type SelectedMediasProps = {
  selectedMedias: MediaWithDuration[];
  onRemove: (mediaId: string) => void;
};

const SelectedMedias = ({ selectedMedias, onRemove }: SelectedMediasProps) => {
  if (selectedMedias.length === 0) return null;

  return (
    <div className="border-t px-6 py-4">
      <h4 className="mb-2 font-semibold">
        Selected Medias ({selectedMedias.length})
      </h4>
      <ScrollArea className="h-[120px]">
        <div className="space-y-2">
          {selectedMedias.map((media) => (
            <div
              key={media.id}
              className="flex items-center justify-between space-x-4 rounded-lg bg-muted p-2"
            >
              <div className="flex min-w-0 flex-1 items-center space-x-4">
                <span className="w-32 shrink-0 truncate text-sm font-medium">
                  {media.name}
                </span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="size-8 shrink-0"
                onClick={() => onRemove(media.id)}
              >
                <X className="size-4" />
                <span className="sr-only">Remove</span>
              </Button>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export type MediasSelectorProps = {
  onSelect: (medias: MediaWithDuration[]) => void;
  initalMedias?: MediaWithDuration[];
};

export const MediasSelector = ({
  onSelect,
  initalMedias = [],
}: MediasSelectorProps) => {
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 300);
  const [selectedMedias, setSelectedMedias] =
    useState<MediaWithDuration[]>(initalMedias);
  const [isGridView, setIsGridView] = useState(true);

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

        <div className="flex items-center justify-between gap-4 border-b px-6 py-4">
          <div className="relative flex-1">
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

        <ScrollArea className="h-[500px] rounded-md p-4">
          {isGridView ? (
            <GridLayout
              medias={medias}
              selectedMedias={selectedMedias}
              onSelect={handleSelect}
              isLoading={isLoading}
            />
          ) : (
            <TableLayout
              medias={medias}
              selectedMedias={selectedMedias}
              onSelect={handleSelect}
              isLoading={isLoading}
            />
          )}
        </ScrollArea>

        <SelectedMedias
          selectedMedias={selectedMedias}
          onRemove={handleRemove}
        />

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
      </DialogContent>
    </Dialog>
  );
};
