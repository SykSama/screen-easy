import { FormSection, FormSectionSide } from "@/components/form-section";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import type { UseFormReturn } from "react-hook-form";
import type { SplitPdfFormValues } from "../new/split-pdf.schema";
import { FileUploader } from "./file-uploader";

export type UploadSectionProps = {
  form: UseFormReturn<SplitPdfFormValues>;
};

export const UploadSection = ({ form }: UploadSectionProps) => {
  return (
    <FormSection>
      <FormSectionSide col={4}>
        <div className="sticky top-12 space-y-2">
          <p className="m-0 text-base text-foreground">PDF Upload</p>
          <p className="text-foreground-light m-0 text-sm">
            Upload the PDFs you want to split.
          </p>
        </div>
      </FormSectionSide>
      <FormSectionSide col={8}>
        <FormField
          control={form.control}
          name="files"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <FileUploader
                  value={field.value}
                  onValueChange={field.onChange}
                  maxFileCount={4}
                  maxSize={4 * 1024 * 1024}
                  accept={{
                    "application/pdf": [".pdf"],
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </FormSectionSide>
    </FormSection>
  );
};
