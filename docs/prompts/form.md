# Form Implementation Guide

This guide explains how to implement forms with mutations using Next.js, React Hook Form, and safe-actions.

## 1. File Structure

app/
└── [feature]/
├── form.schema.ts # Zod schema definitions
├── form.action.ts # Server actions
├── form.tsx # Form component
└── page.tsx # Page component

## 2. Schema Definition

Define your form schema using Zod:

```typescript:form.schema.ts
import { z } from "zod";

export const FormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters long" }),
  // Add other fields...
});
```

## 3. Query Files

Create separate query files for database operations:

```typescript:query/feature/update.query.ts
import { createClient } from "@/utils/supabase/server";
import { Tables } from "@/types/database.generated.types";

export type UpdateQueryProps = {
  id: string;
  data: Tables<"table_name">;
};

export const updateQuery = async ({ id, data }: UpdateQueryProps) => {
  const supabase = await createClient();

  const { data: result } = await supabase
    .from("table_name")
    .update(data)
    .eq("id", id)
    .select()
    .single()
    .throwOnError();

  return result;
};
```

## 4. Server Action

Create a server action using safe-actions:

Only use orgProfileAction if you need to access the org context and the path is related to the org. (e.g. /orgs/:orgSlug/settings)

```typescript:form.action.ts
"use server";

import { orgProfileAction } from "@/lib/actions/safe-actions";
import { FormSchema } from "./form.schema";
import { revalidatePath } from "next/cache";

export const updateAction = orgProfileAction
  .schema(FormSchema)
  .metadata({ actionName: "updateAction", roles: ["OWNER"] })
  .action(async ({ parsedInput, ctx: { organization, profile, user } }) => {
    const updated = await updateQuery({
      id: organization.id,
      data: parsedInput,
    });

    revalidatePath(`/orgs/${organization.slug}`);
  });
```

Else use authAction if the path is not related to the org and the action need to be accessible to any authenticated user. (e.g. /settings)

```typescript:form.action.ts
"use server";

import { authAction } from "@/lib/actions/safe-actions";
import { FormSchema } from "./form.schema";
import { revalidatePath } from "next/cache";

export const updateAction = authAction
  .schema(FormSchema)
  .metadata({ actionName: "updateAction" })
  .action(async ({ parsedInput, {ctx: user} }) => {
    const updated = await updateQuery({
      data: parsedInput,
    });

    revalidatePath(`/path`);
  });
```

## 5. Form Component

Create a form component using React Hook Form and safe-actions:

```typescript:form.tsx
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useHookFormAction } from "@next-safe-action/adapter-react-hook-form/hooks";
import { Form } from "@/components/ui/form";
import { toast } from "sonner";
import { FormSchema } from "./form.schema";
import { updateAction } from "./form.action";

type FormProps = {
  initialData: {
    id: string;
    name: string;
  };
};

export const MyForm = ({ initialData }: FormProps) => {
  const { form, action, handleSubmitWithAction } = useHookFormAction(
    updateAction,
    zodResolver(FormSchema),
    {
      formProps: {
        mode: "onChange",
        values: initialData,
      },
      actionProps: {
        onSuccess: () => {
          toast.success("Updated successfully");
        },
        onError: (args) => {
          if (args.error.serverError) {
            toast.error(args.error.serverError);
          }
        },
      },
    }
  );

  return (
    <Form {...form}>
      <form onSubmit={handleSubmitWithAction} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={action.isPending}>
          {action.isPending ? "Saving..." : "Save"}
        </Button>
      </form>
    </Form>
  );
};
```

## 6. Page Component

Implement the page component:

```typescript:page.tsx
import { getDataQuery } from "@/query/feature/get-data.query";
import { MyForm } from "./form";

export default async function Page() {
  const data = await getDataQuery();
  return (
    <div>
      <MyForm initialData={data} />
    </div>
  );
}
```

## Key Points

1. Use Zod for form validation
2. Separate database queries into dedicated files
3. Use safe-actions for type-safe server actions
4. Implement proper error handling and loading states
5. Use React Hook Form with safe-actions adapter
6. Leverage toast notifications for user feedback
7. Revalidate paths after successful mutations

Remember to:

- Handle loading states
- Implement proper error boundaries
- Use proper TypeScript types
- Follow the server/client component pattern
- Implement proper authorization checks
