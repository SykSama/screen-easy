"use client";

import { useQuery } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";

import type { Row } from "@tanstack/react-table";
import { X } from "lucide-react";
import { useParams } from "next/navigation";
import { useState } from "react";
import { getMediasClientQuery } from "./get-medias.client.query";
import { columns } from "./medias-data-table/medias-columns";
import type { MediasSelector } from "./medias-selector.type";
import { SelectableDataTableForMedia } from "./selectable-data-table-for-media";

export type MediasSelectorTableProps = {
  onSelect?: (medias: MediasSelector[]) => void;
  initialSelectedMedias?: MediasSelector[];
  search?: string;
  enableMultiRowSelection: boolean;
};

export const MediasSelectorTable = ({
  onSelect,
  initialSelectedMedias = [],
  search = "",
  enableMultiRowSelection,
}: MediasSelectorTableProps) => {
  const { orgSlug } = useParams();
  const [selectedMedias, setSelectedMedias] = useState<MediasSelector[]>(
    initialSelectedMedias,
  );

  const { data: medias = [], isLoading } = useQuery({
    queryKey: ["medias", search],
    queryFn: async () =>
      getMediasClientQuery({
        orgSlug: orgSlug as string,
        filters: { search },
      }),
    placeholderData: (previousData) => previousData,
  });

  const handleSelectionChange = (medias: MediasSelector[]) => {
    setSelectedMedias(medias);
    onSelect?.(medias);
  };

  if (isLoading) return <div>Loading.....</div>;

  const initialRowSelection = medias.reduce(
    (acc, media) => {
      acc[media.id] = selectedMedias.some((m) => m.id === media.id);
      return acc;
    },
    {} as Record<string, boolean>,
  );

  return (
    <div>
      <SelectableDataTableForMedia
        columns={columns}
        data={medias}
        initialRowSelection={initialRowSelection}
        getRowId={(row) => row.id}
        onRowSelectionChange={handleSelectionChange}
        renderSelectedItem={(row) => <SelectedItem key={row.id} row={row} />}
        enableMultiRowSelection={enableMultiRowSelection}
      />
    </div>
  );
};

const SelectedItem = ({ row }: { row: Row<MediasSelector> }) => {
  return (
    <div
      key={row.id}
      className="flex items-center justify-between rounded-md border p-2 text-sm hover:bg-muted/50"
    >
      <span>{row.original.name}</span>
      <Button
        variant="ghost"
        size="icon"
        className="size-5"
        onClick={() => row.toggleSelected()}
      >
        <X className="size-3" />
      </Button>
    </div>
  );
};
