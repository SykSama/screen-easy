import { z } from "zod";

export const MediaSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().nullable(),
  type: z.enum(["image", "video"]),
  path: z.string(),
  // thumbnail_url: z.string().nullable(),
  // status: z.string(),
});

export type Media = z.infer<typeof MediaSchema>;

export const MediaInCollectionSchema = z
  .object({
    duration: z.coerce.number().min(0),
    display_order: z.number(),
  })
  .and(MediaSchema);

export type MediaInCollection = z.infer<typeof MediaInCollectionSchema>;
