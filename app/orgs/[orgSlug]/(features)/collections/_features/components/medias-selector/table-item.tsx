import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import type { Media } from "./types";

type TableItemProps = {
  media: Media;
  isSelected: boolean;
  onSelect: () => void;
};

export const TableItem = ({ media, isSelected, onSelect }: TableItemProps) => {
  return (
    <TableRow>
      <TableCell className="w-[100px]">
        <img
          src={media.image}
          alt={media.title}
          className="h-16 w-12 rounded object-cover"
        />
      </TableCell>
      <TableCell className="font-medium">{media.title}</TableCell>
      <TableCell>{media.description}</TableCell>
      <TableCell>
        <div className="flex flex-wrap gap-1">
          {media.tags.map((tag, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      </TableCell>
      <TableCell className="w-[100px]">
        <Button
          variant={isSelected ? "default" : "outline"}
          size="sm"
          onClick={onSelect}
        >
          {isSelected ? "Selected" : "Select"}
        </Button>
      </TableCell>
    </TableRow>
  );
};
