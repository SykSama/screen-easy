"use client";

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
import { zodResolver } from "@hookform/resolvers/zod";
import { useHookFormAction } from "@next-safe-action/adapter-react-hook-form/hooks";
import { CloudUpload } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";
import { createMediaAction } from "./create-media.action";
import { CreateMediaFormSchema } from "./create-media.schema";

export const CreateMediaForm = () => {
  const { form, action, handleSubmitWithAction } = useHookFormAction(
    createMediaAction,
    zodResolver(CreateMediaFormSchema),
    {
      formProps: {
        defaultValues: {
          files: [],
          name: "",
          description: undefined,
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
      <form
        onSubmit={handleSubmitWithAction}
        className="w-full max-w-80 space-y-4 py-10"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" type="" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" type="" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
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
        <LoadingButton
          type="submit"
          isLoading={action.isPending}
          className="self-end"
        >
          Upload
        </LoadingButton>
      </form>
    </Form>
  );
};
