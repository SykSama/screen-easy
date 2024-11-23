import {
  FormSection,
  FormSectionHeader,
  FormSectionSide,
} from "@/components/form-section";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PenLine, Sparkles } from "lucide-react";
import type { UseFormReturn } from "react-hook-form";
import type { SplitPdfFormValues } from "../new/split-pdf.schema";

export type RenamingMethodSectionProps = {
  form: UseFormReturn<SplitPdfFormValues>;
};

export const RenamingMethodSection = ({ form }: RenamingMethodSectionProps) => {
  return (
    <FormSection>
      <FormSectionSide col={4} className="flex flex-col gap-6">
        <FormSectionHeader
          title="Renaming Method"
          description="Choose how the PDF should be renamed."
        />
      </FormSectionSide>

      <FormSectionSide col={8}>
        <Card>
          <CardContent className="gap-6 p-8">
            <FormField
              control={form.control}
              name="renamingMethod"
              render={({ field }) => (
                <FormItem className="space-y-4">
                  <FormControl>
                    <Tabs
                      defaultValue="manual"
                      value={field.value}
                      onValueChange={(value) => field.onChange(value)}
                    >
                      <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="manual" className="flex gap-2">
                          <PenLine className="size-4" />
                          Manual Template
                        </TabsTrigger>
                        <TabsTrigger value="ai" className="flex gap-2">
                          <Sparkles className="size-4" />
                          AI-Based Renaming
                        </TabsTrigger>
                      </TabsList>

                      <TabsContent value="manual" className="mt-6">
                        <FormField
                          control={form.control}
                          name="manualRenameTemplate"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Manual Rename Template</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="[Document]_[Page].pdf"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                              <p className="text-sm text-muted-foreground">
                                Use [Document] for original name, [Page] for
                                page number
                              </p>
                            </FormItem>
                          )}
                        />
                      </TabsContent>

                      <TabsContent value="ai" className="mt-6">
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
                                  Specify how you want the AI to rename your
                                  files
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
                                  Specify how you want the AI to rename your
                                  files
                                </p>
                              </FormItem>
                            )}
                          />
                        </div>
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
