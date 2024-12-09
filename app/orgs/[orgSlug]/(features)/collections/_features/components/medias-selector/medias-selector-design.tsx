"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { LayoutGrid, Search, TableIcon } from "lucide-react";
import * as React from "react";
import { GridLayout } from "./grid-layout";
import { TableLayout } from "./table-layout";
import type { Media } from "./types";

const demoMedia: Media[] = [
  {
    id: "1",
    title: "Character View 1",
    description: "Front view of the character",
    tags: ["front", "pose", "standing"],
    image: "/placeholder.svg?height=300&width=200",
  },
  {
    id: "2",
    title: "Character View 2",
    description: "Side view of the character",
    tags: ["side", "action", "running"],
    image: "/placeholder.svg?height=300&width=200",
  },
  {
    id: "3",
    title: "Character View 3",
    description: "Back view of the character",
    tags: ["back", "stance", "idle"],
    image: "/placeholder.svg?height=300&width=200",
  },
  {
    id: "4",
    title: "Character View 4",
    description: "Top view of the character",
    tags: ["top", "aerial", "flying"],
    image: "/placeholder.svg?height=300&width=200",
  },
  // Add more demo media items to demonstrate scrolling
  ...[...Array(8)].map((_, i) => ({
    id: `${i + 5}`,
    title: `Character View ${i + 5}`,
    description: `Description for view ${i + 5}`,
    tags: [`tag${i + 1}`, `tag${i + 2}`],
    image: `/placeholder.svg?height=300&width=200`,
  })),
];

export default function MediaSelector() {
  const [open, setOpen] = React.useState(true);
  const [selected, setSelected] = React.useState<Set<string>>(new Set());
  const [search, setSearch] = React.useState("");
  const [isGridView, setIsGridView] = React.useState(true);

  const filteredMedia = React.useMemo(() => {
    return demoMedia.filter(
      (media) =>
        media.title.toLowerCase().includes(search.toLowerCase()) ||
        media.description.toLowerCase().includes(search.toLowerCase()) ||
        media.tags.some((tag) =>
          tag.toLowerCase().includes(search.toLowerCase()),
        ),
    );
  }, [search]);

  const selectedMedia = React.useMemo(() => {
    return demoMedia.filter((media) => selected.has(media.id));
  }, [selected]);

  const toggleSelect = (id: string) => {
    const newSelected = new Set(selected);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelected(newSelected);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
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
        <ScrollArea className="flex-1">
          <div className="p-6">
            {isGridView ? (
              <GridLayout
                medias={filteredMedia}
                selectedMediaIds={selected}
                onSelect={toggleSelect}
              />
            ) : (
              <TableLayout
                medias={filteredMedia}
                selectedMediaIds={selected}
                onSelect={toggleSelect}
              />
            )}
          </div>
        </ScrollArea>
        {/* <SelectedMedias medias={selectedMedia} onRemove={toggleSelect} /> */}
        <div className="flex items-center justify-end gap-4 border-t px-6 py-4">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={() => setOpen(false)} disabled={selected.size === 0}>
            Select ({selected.size})
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
