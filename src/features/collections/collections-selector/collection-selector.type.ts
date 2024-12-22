import type { Tables } from "@/types";

export type CollectionSelector = Pick<
  Tables<"collections">,
  "id" | "name" | "description"
>;
