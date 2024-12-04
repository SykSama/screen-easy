"use client";

import { FormSection } from "@/components/form-section";
import { LoadingButton } from "@/components/loading-button";
import {
  FileInput,
  FileUploader,
  FileUploaderContent,
  FileUploaderItem,
} from "@/components/ui/extension/file-upload";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useHookFormAction } from "@next-safe-action/adapter-react-hook-form/hooks";
import { CloudUpload } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";
import { createMediaAction } from "./create-media.action";
import { CreateMediaFormSchema } from "./create-media.schema";
import { MultiSelect } from "@/components/ui/multi-select";

type Option = {
  label: string;
  value: string;
};

type CreateMediaFormProps = {
  collectionOptions: Option[];
};

export const CreateMediaForm = ({
  collectionOptions,
}: CreateMediaFormProps) => {
  const { form, action, handleSubmitWithAction } = useHookFormAction(
    createMediaAction,
    zodResolver(CreateMediaFormSchema),
    {
      formProps: {
        defaultValues: {
          files: [],
          name: "",
          description: undefined,
          collectionIds: [],
        },
      },
      actionProps: {
        onSuccess: () => {
          toast.success("File uploaded successfully", {
            description: "Processing your file...",
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
      <form onSubmit={handleSubmitWithAction} className="mx-auto max-w-4xl">
        <h1 className="text-2xl font-bold">Upload Media</h1>
        <Separator className="my-10 mt-6" />

        {/* Information Section */}
        <FormSection
          title="Information"
          description="Add information about the media"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <div>
                  <FormLabel>Name</FormLabel>
                  <FormDescription className="text-muted-foreground">
                    This is your public display name.
                  </FormDescription>
                </div>
                <FormControl>
                  <Input
                    className="mt-10"
                    placeholder="My beautiful media"
                    type=""
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <div>
                  <FormLabel>Description</FormLabel>
                  <FormDescription>
                    This is your public description.
                  </FormDescription>
                </div>
                <FormControl>
                  <Input placeholder="shadcn" type="" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </FormSection>

        <Separator className="my-10" />

        {/* Collections Section */}
        <FormSection
          title="Collections"
          description="Add this media to collections"
        >
          <FormField
            control={form.control}
            name="collectionIds"
            render={({ field }) => (
              <FormItem>
                <div>
                  <FormLabel>Collections</FormLabel>
                  <FormDescription>
                    Select collections to add this media to
                  </FormDescription>
                </div>
                <FormControl>
                  <MultiSelect
                    options={collectionOptions}
                    value={field.value}
                    onValueChange={field.onChange}
                    placeholder="Select collections"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </FormSection>

        <Separator className="my-10" />

        {/* File Section */}
        <FormSection title="File" description="Add a file to the media">
          <FormField
            control={form.control}
            name="files"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Select File</FormLabel>
                <FormControl>
                  <FileUploader
                    value={field.value}
                    onValueChange={field.onChange}
                    dropzoneOptions={{
                      maxFiles: 5,
                      maxSize: 1024 * 1024 * 4,
                      multiple: false,
                    }}
                    className="relative rounded-lg bg-background p-2"
                  >
                    <FileInput
                      id="fileInput"
                      className="outline-dashed outline-1 outline-slate-500"
                    >
                      <div className="flex w-full flex-col items-center justify-center p-8 ">
                        <CloudUpload className="size-10 text-gray-500" />
                        <p className="mb-1 text-sm text-gray-500 dark:text-gray-400">
                          <span className="font-semibold">Click to upload</span>
                          &nbsp; or drag and drop
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          SVG, PNG, JPG or GIF
                        </p>
                      </div>
                    </FileInput>
                    <FileUploaderContent>
                      {field.value.map((file, i) => (
                        <FileUploaderItem
                          key={i}
                          index={i}
                          aria-roledescription={`file ${i + 1} containing ${file.name}`}
                          className="flex flex-row items-center gap-2 pt-3"
                        >
                          <Image
                            src={URL.createObjectURL(file)}
                            alt={file.name}
                            height={20}
                            width={20}
                            className="size-5 p-0"
                          />
                          <span>{file.name}</span>
                        </FileUploaderItem>
                      ))}
                    </FileUploaderContent>
                  </FileUploader>
                </FormControl>
                <FormDescription>Select a file to upload.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </FormSection>

        <Separator className="my-10" />
        <div className="flex justify-end gap-4">
          <LoadingButton type="submit" isLoading={action.isPending}>
            Upload
          </LoadingButton>
        </div>
      </form>
    </Form>
  );
};
