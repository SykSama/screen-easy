"use no memo";
"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  Row,
  useReactTable,
  type RowSelectionState,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import { ScrollArea } from "./scroll-area";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  onRowSelectionChange?: (selectedRows: TData[]) => void;
  initialRowSelection: RowSelectionState;
  getRowId: (originalRow: TData, index: number, parent?: Row<TData>) => string;
  renderSelectedItem: (row: Row<TData>) => React.ReactNode;
}

export function SelectableDataTable<TData, TValue>({
  columns,
  data,
  getRowId,
  onRowSelectionChange,
  initialRowSelection,
  renderSelectedItem,
}: DataTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] =
    useState<RowSelectionState>(initialRowSelection);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getRowId: getRowId,
    enableRowSelection: true,
    enableMultiRowSelection: true,
    onRowSelectionChange: setRowSelection,
    state: {
      rowSelection,
    },
  });

  useEffect(() => {
    onRowSelectionChange?.(
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
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => row.toggleSelected()}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <SelectedItemView rows={table.getFilteredSelectedRowModel().rows} />
    </div>
  );
}
