import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import { MediaPreviewClient } from "../../media-preview/media-preview-client";
import type { MediasSelector } from "../medias-selector.type";

type GridItemProps = {
  media: MediasSelector;
  isSelected: boolean;
  onClick: () => void;
};

//TODO: add tags later
const tags = ["tag1", "tag2", "tag3"];

export const GridItem = ({ media, isSelected, onClick }: GridItemProps) => {
  return (
    <div
      className={cn(
        "group relative cursor-pointer overflow-hidden rounded-lg  bg-muted transition-all hover:opacity-90",
        isSelected &&
          "ring-2 ring-primary ring-offset-2 ring-offset-background",
      )}
      onClick={onClick}
    >
      <div className="relative aspect-[2/3]">
        <MediaPreviewClient
          media={{
            ...media,
            type: "image",
          }}
          imageProps={{
            fill: true,
            className: "size-full object-contain",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

        <div className="absolute inset-x-0 bottom-0 p-2">
          <h3 className="mb-1 truncate text-sm font-semibold text-white">
            {media.name}
          </h3>
          <div className="flex flex-wrap gap-1">
            {tags.slice(0, 1).map((tag, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="px-1 py-0 text-xs"
              >
                {tag}
              </Badge>
            ))}
            {tags.length > 1 && (
              <Badge variant="secondary" className="px-1 py-0 text-xs">
                <Plus className="mr-0.5 size-2" />
                {tags.length - 1}
              </Badge>
            )}
          </div>
        </div>
        <div
          className={cn(
            "absolute inset-0 bg-black/60 opacity-0 transition-opacity",
            isSelected && "opacity-100",
          )}
        >
          <div className="absolute right-1 top-1">
            <div
              className={cn(
                "h-4 w-4 rounded-full border-2 border-white",
                isSelected && "bg-primary",
              )}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
