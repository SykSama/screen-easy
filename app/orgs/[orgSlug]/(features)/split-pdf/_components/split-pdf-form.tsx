"use client";

import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useHookFormAction } from "@next-safe-action/adapter-react-hook-form/hooks";
import { toast } from "sonner";
import { splitPdfAction } from "../new/split-pdf.action";
import { SplitPdfSchema } from "../new/split-pdf.schema";

import { LoadingButton } from "@/components/loading-button";
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
        },
      },
      actionProps: {
        onSuccess: () => {
          toast.success("PDF files uploaded successfully", {
            description: "Processing your files...",
          });
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

        <div className="mx-auto flex w-full max-w-[1200px] justify-end px-6 lg:px-14 xl:px-24 2xl:px-32">
          <LoadingButton type="submit" size="lg" isLoading={action.isPending}>
            Split PDF
          </LoadingButton>
        </div>
      </form>
    </Form>
  );
};

{
  /* <FormField
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
        /> */
}
