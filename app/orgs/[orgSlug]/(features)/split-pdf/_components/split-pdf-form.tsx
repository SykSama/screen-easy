"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { zodResolver } from "@hookform/resolvers/zod";
import { useHookFormAction } from "@next-safe-action/adapter-react-hook-form/hooks";
import { toast } from "sonner";
import { splitPdfAction } from "../new/split-pdf.action";
import { SplitPdfSchema } from "../new/split-pdf.schema";

import { Separator } from "@/components/ui/separator";
import { RenamingMethodSection } from "./renaming-method-section";
import { SplittingMethodSection } from "./splitting-method-section";
import { UploadSection } from "./upload-section";

export const SplitPdfForm = () => {
  const { form, action, handleSubmitWithAction } = useHookFormAction(
    splitPdfAction,
    zodResolver(SplitPdfSchema),
    {
      formProps: {
        defaultValues: {
          files: [],
          splittingMethod: "bookmarks",
          renamingMethod: "manual",
          saveAsZip: false,
        },
      },
      actionProps: {
        onSuccess: () => {
          toast.success("PDF split successfully");
        },
        onError: (args) => {
          if (args.error.serverError) {
            toast.error(args.error.serverError);
          }
        },
      },
    },
  );

  return (
    <Form {...form}>
      <form onSubmit={handleSubmitWithAction} className="space-y-6">
        <UploadSection form={form} />
        <Separator />

        <SplittingMethodSection form={form} />
        <Separator />

        <RenamingMethodSection form={form} />
        <Separator />

        <FormField
          control={form.control}
          name="saveAsZip"
          render={({ field }) => (
            <FormItem className="flex items-center space-x-2">
              <FormControl>
                <Switch
                  id="save-zip"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormLabel htmlFor="save-zip">Save as ZIP</FormLabel>
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={action.isPending}>
          {action.isPending ? "Processing..." : "Split PDF"}
        </Button>
      </form>
    </Form>
  );
};
