"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import type { Media } from "../../types";
import { MediaPreviewClient } from "../media-preview/media-preview-client";

type TableItemProps = {
  media: Media;
  isSelected: boolean;
  onSelect: () => void;
};

//TODO: add tags later
const tags = ["tag1", "tag2", "tag3"];

export const TableItem = ({ media, isSelected, onSelect }: TableItemProps) => {
  return (
    <TableRow>
      <TableCell className="w-[100px]">
        <MediaPreviewClient
          media={media}
          transform={{
            width: 48,
            height: 64,
            resize: "contain",
          }}
          imageProps={{
            className: "rounded object-contain",
            width: 48,
            height: 64,
          }}
        />
      </TableCell>
      <TableCell className="font-medium">{media.name}</TableCell>
      <TableCell>{media.description}</TableCell>
      <TableCell>
        <div className="flex flex-wrap gap-1">
          {tags.map((tag, index) => (
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
