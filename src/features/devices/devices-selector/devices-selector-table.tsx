"use client";

import { useQuery } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";
import { SelectableDataTable } from "@/components/ui/selectable-data-table";

import type { Row } from "@tanstack/react-table";
import { X } from "lucide-react";
import { useParams } from "next/navigation";
import { useState } from "react";
import { columns } from "./devices-data-table/devices-columns";
import type { DeviceSelector } from "./devices-selector.type";
import { getDevicesClientQuery } from "./get-devices.client.query";

export type DevicesSelectorTableProps = {
  onSelect?: (devices: DeviceSelector[]) => void;
  initialSelectedDevices?: DeviceSelector[];
  search?: string;
  enableMultiRowSelection: boolean;
};

export const DevicesSelectorTable = ({
  onSelect,
  initialSelectedDevices = [],
  search = "",
  enableMultiRowSelection,
}: DevicesSelectorTableProps) => {
  const { orgSlug } = useParams();
  const [selectedDevices, setSelectedDevices] = useState<DeviceSelector[]>(
    initialSelectedDevices,
  );

  const { data: devices = [], isLoading } = useQuery({
    queryKey: ["devices", search],
    queryFn: async () =>
      getDevicesClientQuery({
        orgSlug: orgSlug as string,
        filters: { search },
      }),
    placeholderData: (previousData) => previousData,
  });

  const handleSelectionChange = (devices: DeviceSelector[]) => {
    setSelectedDevices(devices);
    onSelect?.(devices);
  };

  if (isLoading) return <div>Loading.....</div>;

  const initialRowSelection = devices.reduce(
    (acc, device) => {
      acc[device.id] = selectedDevices.some((d) => d.id === device.id);
      return acc;
    },
    {} as Record<string, boolean>,
  );

  return (
    <div>
      <SelectableDataTable
        columns={columns}
        data={devices}
        initialRowSelection={initialRowSelection}
        getRowId={(row) => row.id}
        onRowSelectionChange={handleSelectionChange}
        renderSelectedItem={(row) => <SelectedItem key={row.id} row={row} />}
        enableMultiRowSelection={enableMultiRowSelection}
      />
    </div>
  );
};

const SelectedItem = ({ row }: { row: Row<DeviceSelector> }) => {
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
