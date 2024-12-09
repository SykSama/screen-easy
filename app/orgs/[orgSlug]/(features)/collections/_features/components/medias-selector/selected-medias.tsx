import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { X } from "lucide-react";
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
      <ScrollArea className="h-[120px]">
        <div className="space-y-2">
          {medias.map((media) => (
            <div
              key={media.id}
              className="flex items-center justify-between space-x-4 rounded-lg bg-muted p-2"
            >
              <div className="flex min-w-0 flex-1 items-center space-x-4">
                <span className="w-32 shrink-0 truncate text-sm font-medium">
                  {media.title}
                </span>
                <p className="flex-1 truncate text-xs text-muted-foreground">
                  {media.description}
                </p>
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
