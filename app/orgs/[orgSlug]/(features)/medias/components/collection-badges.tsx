"use client";

import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { Tables } from "@/types/database.types";

type Collection = Pick<Tables<"collections">, "id" | "name">;

type CollectionBadgesProps = {
  collections: Collection[];
  maxVisible?: number;
};

export const CollectionBadges = ({
  collections,
  maxVisible = 2,
}: CollectionBadgesProps) => {
  if (!collections.length) return null;

  const visibleCollections = collections.slice(0, maxVisible);
  const remainingCount = collections.length - maxVisible;

  return (
    <div className="flex flex-wrap gap-1">
      {visibleCollections.map((collection) => (
        <Badge key={collection.id} variant="secondary">
          {collection.name}
        </Badge>
      ))}
      {remainingCount > 0 && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Badge variant="outline">+{remainingCount} more</Badge>
            </TooltipTrigger>
            <TooltipContent>
              <div className="flex flex-col gap-1">
                {collections.slice(maxVisible).map((collection) => (
                  <span key={collection.id}>{collection.name}</span>
                ))}
              </div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </div>
  );
};
