import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Plus, X } from "lucide-react";
import type { Media } from "./types";

type SelectedMediasProps = {
  medias: Media[];
  onRemove: (mediaId: string) => void;
};

export const SelectedMedias = ({ medias, onRemove }: SelectedMediasProps) => {
  if (medias.length === 0) return null;

  return (
    <div className="border-t px-6 py-4">
      <h4 className="mb-2 font-semibold">Selected Images ({medias.length})</h4>
      <ScrollArea className="h-40">
        <div className="space-y-2 pr-4">
          {medias.map((media) => (
            <div
              key={media.id}
              className="flex items-center justify-between space-x-4 rounded-lg bg-card p-2 px-4 text-card-foreground"
            >
              <div className="flex min-w-0 flex-1 items-center space-x-4">
                <span className="w-32 shrink-0 truncate text-sm font-medium">
                  {media.title}
                </span>
                <p className="flex-1 truncate text-xs">{media.description}</p>
                <div className="flex shrink-0 flex-wrap gap-1">
                  {media.tags.slice(0, 2).map((tag, index) => (
                    <Badge key={index} variant={"outline"} className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                  {media.tags.length > 2 && (
                    <Badge variant="secondary" className="text-xs">
                      <Plus className="mr-1 size-3" />
                      {media.tags.length - 2}
                    </Badge>
                  )}
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="size-8 shrink-0"
                onClick={(e) => {
                  e.stopPropagation();
                  onRemove(media.id);
                }}
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
