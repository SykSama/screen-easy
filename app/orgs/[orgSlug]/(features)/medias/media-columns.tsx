"use client";

import { Badge } from "@/components/ui/badge";
import { formatBytes } from "@/lib/utils";
import type { GetOrganizationMediasOutput } from "@/queries/media/get-organization-medias.query";
import type { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { ImageIcon, VideoIcon } from "lucide-react";
import { CollectionBadges } from "./components/collection-badges";
import { MediaNameCell } from "./components/media-name-cell";

export const columns: ColumnDef<GetOrganizationMediasOutput>[] = [
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
    cell: ({ row }) => (
      <MediaNameCell
        id={row.original.id}
        name={row.getValue("name")}
        description={row.original.description}
      />
    ),
  },
  {
    accessorKey: "collections",
    header: "Collections",
    cell: ({ row }) => {
      const collections = row.original.collections;
      return <CollectionBadges collections={collections} />;
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
