"use client";

import type { Tables } from "@/types";
import { useQuery } from "@tanstack/react-query";

import { SelectableDataTable } from "@/components/ui/selectable-data-table";
import { useParams } from "next/navigation";
import { useState } from "react";
import { useDebounce } from "use-debounce";
import { columns } from "./collections-data-table/collections-columns";
import { getCollectionsClientQuery } from "./get-collections.client.query";

type Collection = Tables<"collections">;

const useDebouncedSearch = () => {
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 300);

  return { search, setSearch, debouncedSearch };
};

export type CollectionsSelectorTableProps = {
  onSelect?: (collections: Collection[]) => void;
  initalCollections?: Collection[];
};

export const CollectionsSelectorTable = ({
  onSelect,
  initalCollections = [],
}: CollectionsSelectorTableProps) => {
  const { orgSlug } = useParams();
  const [selectedCollections, setSelectedCollections] =
    useState<Collection[]>(initalCollections);

  const { setSearch, debouncedSearch } = useDebouncedSearch();

  const { data: collections, isFetching } = useQuery({
    queryKey: ["collections", debouncedSearch],
    initialData: [],
    queryFn: async () =>
      getCollectionsClientQuery({
        orgSlug: orgSlug as string,
        filters: { search: debouncedSearch },
      }),
  });

  if (isFetching) return <div>Loading.....</div>;

  const initialRowSelection = collections.reduce(
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
        data={collections}
        initialRowSelection={initialRowSelection}
        getRowId={(row) => row.id}
        onRowSelectionChange={setSelectedCollections}
      />
    </div>
  );
};
