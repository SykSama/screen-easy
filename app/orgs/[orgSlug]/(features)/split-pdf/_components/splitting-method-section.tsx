"use client";

import { FormSectionHeader, FormSectionSide } from "@/components/form-section";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bookmark, Sparkles } from "lucide-react";
import type { UseFormReturn } from "react-hook-form";
import type { SplitPdfFormValues } from "../new/split-pdf.schema";

import { FormSection } from "@/components/form-section";
import { Card, CardContent } from "@/components/ui/card";

export type SplittingMethodSectionProps = {
  form: UseFormReturn<SplitPdfFormValues>;
};

export const SplittingMethodSection = ({
  form,
}: SplittingMethodSectionProps) => {
  return (
    <FormSection>
      <FormSectionSide col={4} className="flex flex-col gap-6">
        <FormSectionHeader
          title="Splitting Method"
          description="Choose how the PDF should be split."
        />
      </FormSectionSide>

      <FormSectionSide col={8}>
        <Card>
          <CardContent className="gap-6 p-8">
            <FormField
              control={form.control}
              name="splittingMethod"
              render={({ field }) => (
                <FormItem className="space-y-4">
                  <FormControl>
                    <Tabs
                      defaultValue="bookmarks"
                      value={field.value}
                      onValueChange={(value) => field.onChange(value)}
                    >
                      <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="bookmarks" className="flex gap-2">
                          <Bookmark className="size-4" />
                          Split by bookmarks
                        </TabsTrigger>
                        <TabsTrigger value="ai" className="flex gap-2">
                          <Sparkles className="size-4" />
                          AI-based splitting
                        </TabsTrigger>
                      </TabsList>

                      <TabsContent value="bookmarks" className="mt-6">
                        <p className="text-sm text-muted-foreground">
                          The PDF will be automatically split based on its
                          existing bookmarks. No additional configuration
                          needed.
                        </p>
                      </TabsContent>

                      <TabsContent value="ai" className="mt-6">
                        <FormField
                          control={form.control}
                          name="aiSplittingCriteria"
                          defaultValue=""
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
                                This will be used to determine how the PDF is
                                split.
                              </p>
                            </FormItem>
                          )}
                        />
                      </TabsContent>
                    </Tabs>
                  </FormControl>
                </FormItem>
              )}
            />
          </CardContent>
        </Card>
      </FormSectionSide>
    </FormSection>
  );
};
