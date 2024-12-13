"use client";

import type { Tables } from "@/types/database.types";
import type { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<Tables<"devices">>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      const name = row.getValue("name") as string;
      const description = row.original.description as string | null;
      return (
        <div className="flex flex-col">
          <span className="font-medium">{name}</span>
          {description && (
            <span className="text-sm text-muted-foreground">{description}</span>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "created_at",
    header: "Created At",
    cell: ({ row }) => {
      const date = new Date(row.getValue("created_at"));
      return <span>{date.toLocaleDateString()}</span>;
    },
  },
];
