"use no memo";
"use client";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import type {
  ColumnDef,
  Table as ReactTable,
  Row,
} from "@tanstack/react-table";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  type RowSelectionState,
} from "@tanstack/react-table";
import { LayoutGrid, TableIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { columns } from "./medias-data-table/medias-columns";
import { GridItem } from "./medias-data-table/medias-grid-item";
import type { MediasSelector } from "./medias-selector.type";

type DataTableProps<TData, TValue> = {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  onRowSelectionChange: (selectedRows: TData[]) => void;
  initialRowSelection: RowSelectionState;
  getRowId: (originalRow: TData, index: number, parent?: Row<TData>) => string;
  renderSelectedItem: (row: Row<TData>) => React.ReactNode;
  enableMultiRowSelection: boolean;
  isLoading?: boolean;
};

export function SelectableDataTableForMedia<TData, TValue>({
  columns,
  data,
  getRowId,
  onRowSelectionChange,
  initialRowSelection,
  renderSelectedItem,
  enableMultiRowSelection,
  isLoading,
}: DataTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] =
    useState<RowSelectionState>(initialRowSelection);
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getRowId: getRowId,
    enableRowSelection: true,
    enableMultiRowSelection: enableMultiRowSelection,
    onRowSelectionChange: setRowSelection,
    state: {
      rowSelection,
    },
  });

  useEffect(() => {
    onRowSelectionChange(
      table.getFilteredSelectedRowModel().rows.map((row) => row.original),
    );
  }, [rowSelection]);

  const SelectedItemView = ({ rows }: { rows: Row<TData>[] }) => {
    return (
      <div className="w-80 border-l pl-4">
        <h4 className="mb-4 font-medium">Selected Collections</h4>
        <ScrollArea className="h-[500px]">
          <div className="space-y-2">
            {table.getFilteredSelectedRowModel().rows.map(renderSelectedItem)}
            {table.getFilteredSelectedRowModel().rows.length === 0 && (
              <div className="text-sm text-muted-foreground">
                No collections selected
              </div>
            )}
          </div>
        </ScrollArea>
      </div>
    );
  };

  return (
    <div className="flex gap-4">
      <div className="flex-1">
        <div className="mb-4 flex justify-end">
          <div className="flex space-x-2">
            <Button
              variant={viewMode === "grid" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("grid")}
            >
              <LayoutGrid className="mr-2 size-4" />
              Grid Layout
            </Button>
            <Button
              variant={viewMode === "table" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("table")}
            >
              <TableIcon className="mr-2 size-4" />
              Table
            </Button>
          </div>
        </div>

        {viewMode === "grid" ? (
          <MediaGridLayout table={table} isLoading={isLoading} />
        ) : (
          <MediaDataTable table={table} />
        )}
      </div>
      <SelectedItemView rows={table.getFilteredSelectedRowModel().rows} />
    </div>
  );
}

export const MediaGridLayout = <TData, TValue>({
  table,
  isLoading,
}: {
  table: ReactTable<TData>;
  isLoading?: boolean;
}) => {
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
    <ScrollArea className="h-full max-h-screen overflow-y-auto">
      <div className="p-2">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {table.getRowModel().rows.map((row) => (
            <GridItem
              key={row.id}
              media={row.original as MediasSelector}
              isSelected={row.getIsSelected()}
              onClick={() => row.toggleSelected()}
            />
          ))}
        </div>
      </div>
    </ScrollArea>
  );
};

export const MediaDataTable = <TData, TValue>({
  table,
}: {
  table: ReactTable<TData>;
}) => {
  return (
    <Table>
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => {
              return (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                </TableHead>
              );
            })}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {table.getRowModel().rows.length ? (
          table.getRowModel().rows.map((row) => (
            <TableRow
              key={row.id}
              data-state={row.getIsSelected() && "selected"}
              className="cursor-pointer hover:bg-muted/50"
              onClick={() => row.toggleSelected()}
            >
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={columns.length} className="h-24 text-center">
              No results.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
