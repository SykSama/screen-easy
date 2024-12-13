import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import type { Media } from "../../types";
import { TableItem } from "./table-item";

type TableLayoutProps = {
  medias: Media[];
  selectedMediaIds: Set<string>;
  onSelect: (mediaId: string) => void;
  isLoading?: boolean;
};

export const TableLayout = ({
  medias,
  selectedMediaIds,
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
          <TableHead className="w-[100px]">Image</TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Tags</TableHead>
          <TableHead className="w-[100px]">Select</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {medias.map((media) => (
          <TableItem
            key={media.id}
            media={media}
            isSelected={selectedMediaIds.has(media.id)}
            onSelect={() => onSelect(media.id)}
          />
        ))}
      </TableBody>
    </Table>
  );
};
