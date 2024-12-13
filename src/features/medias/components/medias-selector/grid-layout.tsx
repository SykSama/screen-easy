import { Skeleton } from "@/components/ui/skeleton";
import type { Media } from "../../types";
import { GridItem } from "./grid-item";

type GridLayoutProps = {
  medias: Media[];
  selectedMediaIds: Set<string>;
  onSelect: (mediaId: string) => void;
  isLoading?: boolean;
};

export const GridLayout = ({
  medias,
  selectedMediaIds,
  onSelect,
  isLoading,
}: GridLayoutProps) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 9 }).map((_, i) => (
          <Skeleton key={i} className="aspect-[2/3]" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      {medias.map((media) => (
        <GridItem
          key={media.id}
          media={media}
          isSelected={selectedMediaIds.has(media.id)}
          onClick={() => onSelect(media.id)}
        />
      ))}
    </div>
  );
};
