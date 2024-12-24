import type { Tables } from "@/types";

export type MediasSelector = Pick<
  Tables<"media">,
  "id" | "name" | "description" | "path"
>;
