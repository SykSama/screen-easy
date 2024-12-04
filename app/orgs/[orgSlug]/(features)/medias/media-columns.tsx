"use client";

import { Badge } from "@/components/ui/badge";
import { formatBytes } from "@/lib/utils";
import type { Tables } from "@/types/database.generated.types";
import type { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { ImageIcon, VideoIcon } from "lucide-react";

export const columns: ColumnDef<Tables<"media">>[] = [
  {
    id: "type",
    header: () => <span />,

    cell: ({ row }) => {
      const type = row.original.type as "image" | "video";
      return type === "image" ? <ImageIcon /> : <VideoIcon />;
    },
  },
  {
    accessorKey: "name",
    header: "Name",
    minSize: 500,
    cell: ({ row }) => {
      const name = row.getValue("name") as string;
      const description = row.original.description as string | null;

      return (
        <div className="flex flex-col">
          <span className="font-medium">{name}</span>
          <span className="text-sm text-muted-foreground">{description}</span>
        </div>
      );
    },
  },

  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as "processing" | "ready" | "error";
      return (
        <Badge
          variant={
            status === "ready"
              ? "default"
              : status === "error"
                ? "destructive"
                : "default"
          }
        >
          {status}
        </Badge>
      );
    },
  },
  {
    accessorKey: "file_size",
    header: "Size",
    cell: ({ row }) => {
      const size = row.getValue("file_size") as number;
      return formatBytes(size);
    },
  },
  {
    accessorKey: "created_at",
    header: "Uploaded",
    cell: ({ row }) => {
      const date = row.getValue("created_at") as string;
      const dateObj = new Date(date);

      return (
        <div className="flex flex-col">
          <span>{format(dateObj, "d MMMM yyyy")}</span>
          <span className="text-muted-foreground">
            {format(dateObj, "HH:mm")}
          </span>
        </div>
      );
    },
  },
];
