"use client";

import type { Tables } from "@/types";
import { useQuery } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";
import { SelectableDataTable } from "@/components/ui/selectable-data-table";
import type { Row } from "@tanstack/react-table";
import { X } from "lucide-react";
import { useParams } from "next/navigation";
import { useState } from "react";
import { columns } from "./collections-data-table/collections-columns";
import { getCollectionsClientQuery } from "./get-collections.client.query";

type Collection = Tables<"collections">;

export type CollectionsSelectorTableProps = {
  onSelect?: (collections: Collection[]) => void;
  initialSelectedCollections?: Collection[];
  search?: string;
};

export const CollectionsSelectorTable = ({
  onSelect,
  initialSelectedCollections = [],
  search = "",
}: CollectionsSelectorTableProps) => {
  const { orgSlug } = useParams();
  const [selectedCollections, setSelectedCollections] = useState<Collection[]>(
    initialSelectedCollections,
  );

  const { data: collections, isPending } = useQuery({
    queryKey: ["collections", search],
    queryFn: async () =>
      getCollectionsClientQuery({
        orgSlug: orgSlug as string,
        filters: { search },
      }),
  });

  const handleSelectionChange = (collections: Collection[]) => {
    setSelectedCollections(collections);
    onSelect?.(collections);
  };

  if (isPending) return <div>Loading.....</div>;

  const initialRowSelection = collections?.reduce(
    (acc, collection) => {
      acc[collection.id] = selectedCollections.some(
        (c) => c.id === collection.id,
      );
      return acc;
    },
    {} as Record<string, boolean>,
  );

  return (
    <div>
      <SelectableDataTable
        columns={columns}
        data={collections ?? []}
        initialRowSelection={initialRowSelection ?? {}}
        getRowId={(row) => row.id}
        onRowSelectionChange={handleSelectionChange}
        renderSelectedItem={(row) => <SelectedItem key={row.id} row={row} />}
      />
    </div>
  );
};

const SelectedItem = ({ row }: { row: Row<Collection> }) => {
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
