import { schemaTask } from "@trigger.dev/sdk/v3";
import { z } from "zod";

const splitPdfSchema = z.object({
  method: z.enum(["ai", "manual"]),
});

export const splitPdfTask = schemaTask({
  id: "split-pdf",
  schema: splitPdfSchema,
  init: async (payload, params) => {
    console.log(payload, params);
  },
  run: async (payload) => {
    console.log();
  },
  onSuccess: async (payload, params) => {
    console.log("success", payload, params);
  },
  onFailure: async (payload, error, params) => {
    console.log("failure", payload, error, params);
  },
});
