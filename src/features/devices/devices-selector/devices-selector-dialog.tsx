"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";
import { useDebounce } from "use-debounce";
import { DevicesSelectorTable } from "./devices-selector-table";
import type { DeviceSelector } from "./devices-selector.type";

export type DevicesSelectorDialogProps = {
  onSelect?: (devices: DeviceSelector[]) => void;
  initialSelectedDevices?: DeviceSelector[];
  enableMultiRowSelection: boolean;
};

export const DevicesSelectorDialog = ({
  onSelect,
  initialSelectedDevices,
  enableMultiRowSelection,
}: DevicesSelectorDialogProps) => {
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 500);
  const [selectedDevices, setSelectedDevices] = useState<DeviceSelector[]>(
    initialSelectedDevices ?? [],
  );

  const buttonTriggerTitle =
    selectedDevices.length > 0
      ? `Devices (${selectedDevices.length})`
      : "Select devices";

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">{buttonTriggerTitle}</Button>
      </DialogTrigger>
      <DialogContent className="max-w-5xl">
        <DialogHeader>
          <DialogTitle>Select devices</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Select a device to add to this collection
        </DialogDescription>
        <div className="space-y-4">
          <Input
            placeholder="Search devices..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            autoFocus={true}
          />
          <ScrollArea className="h-[600px]">
            <DevicesSelectorTable
              onSelect={setSelectedDevices}
              search={debouncedSearch}
              initialSelectedDevices={selectedDevices}
              enableMultiRowSelection={enableMultiRowSelection}
            />
          </ScrollArea>
        </div>
        <DialogClose asChild>
          <Button onClick={() => onSelect?.(selectedDevices)}>Valider</Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};
