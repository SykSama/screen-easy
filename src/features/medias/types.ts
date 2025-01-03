import { z } from "zod";

export const MediaSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().nullable(),
  // type: z.enum(["image", "video"]),
  path: z.string(),
});

export type Media = z.infer<typeof MediaSchema>;

export const ResizeModeSchema = z.enum([
  "center",
  "contain",
  "cover",
  "repeat",
  "stretch",
]);

export type ResizeMode = z.infer<typeof ResizeModeSchema>;

export const MediaInCollectionSchema = z
  .object({
    duration: z.coerce.number().min(1, "You need to set a duration"),
    display_order: z.number(),
    resize_mode: ResizeModeSchema.default("cover"),
  })
  .and(MediaSchema);

export type MediaInCollection = z.infer<typeof MediaInCollectionSchema>;
