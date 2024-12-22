import type { Tables } from "@/types";

export type DeviceSelector = Pick<
  Tables<"devices">,
  "id" | "name" | "description"
>;
