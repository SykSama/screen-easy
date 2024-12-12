import { z } from "zod";

export type Media = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  image: string;
};

export const MediaWithDurationSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  duration: z.number(),
});

export type MediaWithDuration = z.infer<typeof MediaWithDurationSchema>;
