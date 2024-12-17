"use client";

import type { GetDevicesOutput } from "@/queries/devices/get-devices.query";
import type { IconProp } from "@fortawesome/fontawesome-svg-core";
import {
  faAndroid,
  faApple,
  faLinux,
  faWindows,
} from "@fortawesome/free-brands-svg-icons";
import { faDesktop } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<GetDevicesOutput>[] = [
  {
    accessorKey: "device_information.device_brand",
    header: "",
    cell: ({ row }) => {
      const brand = row.original.device_information?.device_brand;
      if (!brand) return null;
      return <DeviceBrandIcon brand={brand} />;
    },
  },
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
    accessorKey: "model",
    header: "Model",
    cell: ({ row }) => {
      const model = row.original.device_information?.device_name;
      const os = row.original.device_information?.device_os;
      const osVersion = row.original.device_information?.device_os_version;
      if (!model) return null;

      return (
        <div className="flex flex-col">
          <span className="font-medium">{model}</span>
          <div className="flex gap-1">
            {os && <span className="text-sm text-muted-foreground">{os}</span>}
            {osVersion && (
              <span className="text-sm text-muted-foreground">{osVersion}</span>
            )}
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "collections.name",
    header: "Collection",
    cell: ({ row }) => {
      const collection = row.original.collections;
      if (!collection) return null;

      const name = collection.name;
      const description = collection.description as string | null;

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
    accessorKey: "resolution",
    header: "Resolution",
    cell: ({ row }) => {
      const deviceInformation = row.original.device_information;
      if (!deviceInformation) return null;

      const screenHeight = deviceInformation.screen_height;
      const screenWidth = deviceInformation.screen_width;
      const scale = deviceInformation.screen_scale;

      if (!screenHeight || !screenWidth || !scale) return null;

      return (
        <span>
          {screenWidth * scale} x {screenHeight * scale}
        </span>
      );
    },
  },
  {
    accessorKey: "orientation",
    header: "Orientation",
    cell: ({ row }) => {
      const deviceInformation = row.original.device_information;
      if (!deviceInformation) return null;

      const screenHeight = deviceInformation.screen_height;
      const screenWidth = deviceInformation.screen_width;

      if (!screenHeight || !screenWidth) return null;

      const orientation = screenHeight > screenWidth ? "Portrait" : "Landscape";

      return <span>{orientation}</span>;
    },
  },
  {
    accessorKey: "created_at",
    header: "Created At",
    cell: ({ row }) => {
      const date = new Date(row.getValue("created_at"));
      return (
        <span>{date.toLocaleDateString("en-US", { dateStyle: "medium" })}</span>
      );
    },
  },
];

export type DeviceBrandIconProps = {
  brand: string;
};

export const DeviceBrandIcon = ({ brand }: DeviceBrandIconProps) => {
  const brandMinus = brand.toLowerCase();

  let iconProps: IconProp;

  switch (brandMinus) {
    case "apple":
      iconProps = faApple;
      break;
    case "android":
      iconProps = faAndroid;
      break;
    case "linux":
      iconProps = faLinux;
      break;
    case "windows":
      iconProps = faWindows;
      break;
    case "macos":
      iconProps = faApple;
      break;
    default:
      iconProps = faDesktop;
      break;
  }

  return <FontAwesomeIcon icon={iconProps} className="size-5" />;
};
