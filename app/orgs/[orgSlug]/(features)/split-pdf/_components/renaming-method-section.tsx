import { FormSection, FormSectionSide } from "@/components/form-section";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import type { UseFormReturn } from "react-hook-form";
import type { SplitPdfFormValues } from "../new/split-pdf.schema";

export type RenamingMethodSectionProps = {
  form: UseFormReturn<SplitPdfFormValues>;
};

export const RenamingMethodSection = ({ form }: RenamingMethodSectionProps) => {
  const watchRenamingMethod = form.watch("renamingMethod");

  return (
    <FormSection>
      <FormSectionSide col={4} className="flex flex-col gap-6">
        <div className="sticky top-12 space-y-2">
          <p className="m-0 text-base text-foreground">Renaming Method</p>
          <p className="text-foreground-light m-0 text-sm">
            Choose how the PDF should be renamed.
          </p>
        </div>
        <FormField
          control={form.control}
          name="renamingMethod"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <RadioGroup
                  onValueChange={(value: "manual" | "ai") =>
                    field.onChange(value)
                  }
                  defaultValue="manual"
                  className="flex flex-col gap-3"
                >
                  <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="manual" id="manual" />
                    </FormControl>
                    <FormLabel htmlFor="manual">
                      Manual Rename Template
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="ai" id="ai-renaming" />
                    </FormControl>
                    <FormLabel htmlFor="ai-renaming">
                      AI-Based Renaming
                    </FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
            </FormItem>
          )}
        />
      </FormSectionSide>

      <FormSectionSide col={8}>
        <Card>
          <CardContent className="gap-6 p-8">
            {watchRenamingMethod === "manual" && (
              <FormField
                control={form.control}
                name="manualRenameTemplate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Manual Rename Template</FormLabel>
                    <FormControl>
                      <Input placeholder="[Document]_[Page].pdf" {...field} />
                    </FormControl>
                    <FormMessage />
                    <p className="text-sm text-muted-foreground">
                      Use [Document] for original name, [Page] for page number
                    </p>
                  </FormItem>
                )}
              />
            )}

            {watchRenamingMethod === "ai" && (
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="aiRenamingCriteria"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>AI Renaming Criteria</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g., extract date, use company name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                      <p className="text-sm text-muted-foreground">
                        Specify how you want the AI to rename your files
                      </p>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="aiRenamingExample"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>AI Renaming Example</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g., extract date, use company name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                      <p className="text-sm text-muted-foreground">
                        Specify how you want the AI to rename your files
                      </p>
                    </FormItem>
                  )}
                />
              </div>
            )}
          </CardContent>
        </Card>
      </FormSectionSide>
    </FormSection>
  );
};
