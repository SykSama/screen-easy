"use client";

import { FormSectionSide } from "@/components/form-section";
import { Card, CardContent } from "@/components/ui/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import type { UseFormReturn } from "react-hook-form";
import type { SplitPdfFormValues } from "../new/split-pdf.schema";

import { FormSection } from "@/components/form-section";
export type SplittingMethodSectionProps = {
  form: UseFormReturn<SplitPdfFormValues>;
};

export const SplittingMethodSection = ({
  form,
}: SplittingMethodSectionProps) => {
  const watchSplittingMethod = form.watch("splittingMethod");

  return (
    <FormSection>
      <FormSectionSide col={4} className="flex flex-col gap-6">
        <div className="sticky top-12 space-y-2">
          <p className="m-0 text-base text-foreground">Splitting Method</p>
          <p className="text-foreground-light m-0 text-sm">
            Choose how the PDF should be split.
          </p>
        </div>
        <FormField
          control={form.control}
          name="splittingMethod"
          render={({ field }) => (
            <FormItem className="text-sm">
              <FormControl>
                <RadioGroup
                  onValueChange={(value: "bookmarks" | "ai") =>
                    field.onChange(value)
                  }
                  defaultValue="bookmarks"
                  className="flex flex-col gap-3"
                >
                  <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="bookmarks" id="bookmarks" />
                    </FormControl>
                    <FormLabel htmlFor="bookmarks">
                      Split by Bookmarks
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="ai" id="ai-splitting" />
                    </FormControl>
                    <FormLabel htmlFor="ai-splitting">
                      AI-Based Splitting
                    </FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
            </FormItem>
          )}
        />
      </FormSectionSide>

      <FormSectionSide col={8}>
        <Card hidden={watchSplittingMethod !== "ai"}>
          <CardContent className="gap-6 p-8">
            <FormField
              control={form.control}
              name="aiSplittingCriteria"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>AI Splitting Criteria</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g., invoice number, date"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                  <p className="text-sm text-muted-foreground">
                    This will be used to determine how the PDF is split.
                  </p>
                </FormItem>
              )}
            />
          </CardContent>
        </Card>
      </FormSectionSide>
    </FormSection>
  );
};
