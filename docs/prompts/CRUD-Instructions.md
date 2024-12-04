# CRUD Operations Guide for Next.js App Router

This guide outlines the standard patterns for implementing CRUD operations in a Next.js application using Server Components, Server Actions, and Supabase.

## Table Structure

First, ensure your table exists in the Supabase database with proper types generated:

```sql
  create table "public"."{feature_name}" (
  id uuid not null default gen_random_uuid(),
  created_at timestamp with time zone default now(),
  organization_id uuid not null references organizations(id),
  name text not null,
  description text,
  -- Add other fields specific to your feature
  primary key (id)
);
```

## Read Operations

### 1. Create the Query File

```typescript:src/queries/{feature-name}/get-{feature-name}.query.ts
import { createClient } from "@/utils/supabase/server";
import type { Tables } from "@/types/database.types";
import { SupabasePostgrestActionError } from "@/lib/errors/errors";

export type Get{FeatureName}Input = Pick<
  Tables<"{table_name}">,
  "organization_id"
> ;

export const get{FeatureName}Query = async ({
  organization_id,
}: Get{FeatureName}Input) => {
const supabase = await createClient();

const { data, error } = await supabase
  .from("{table_name}")
  .select()
  .eq("organization_id", organization_id)
  .order("created_at", { ascending: false });

if (error) {
  throw new SupabasePostgrestActionError(error);
}

return data;
};
```

### 2. Create Data Table Columns

```typescript:app/orgs/[orgSlug]/(features)/{feature-name}/{feature-name}-columns.tsx
"use client";

import type { ColumnDef } from "@tanstack/react-table";
import type { Tables } from "@/types/database.generated.types";

export const columns: ColumnDef<Tables<"{feature_name}">>[] = [
{
  accessorKey: "name",
  header: "Name",
  cell: ({ row }) => {
    const name = row.getValue("name") as string;
    const description = row.original.description as string | null;
    return (
      <div className="flex flex-col">
        <span className="font-medium">{name}</span>
        <span className="text-sm text-muted-foreground">{description}</span>
      </div>
    );
    },
  },
  // Add other columns...
];
```

### 3. Create Data Table Component

```tsx:app/orgs/[orgSlug]/(features)/{feature-name}/{feature-name}-data-table.tsx
import { DataTable } from "@/components/ui/data-table";
import { get{FeatureName}Query } from "@/queries/{feature-name}/get-{feature-name}.query";

export const {FeatureName}DataTable = async ({
  organizationSlug
}: {
  organizationSlug: string
}) => {
  const organization = await getOrganizationFromSlugQuery(organizationSlug);
  const items = await get{FeatureName}Query({
  organization_id: organization.id,
  });

  return (
  <Card>
    <CardContent className="p-0">
      <DataTable columns={columns} data={items} />
    </CardContent>
  </Card>
  );
};
```

## Create Operations

### 1. Create the Query File

```typescript:src/queries/{feature-name}/create-{feature-name}.query.ts
import { SupabasePostgrestActionError } from "@/lib/errors/errors";
import type { Tables, TablesInsert } from "@/types/database.types";
import { createClient } from "@/utils/supabase/server";

export const create{FeatureName}Query = async (
  {feature_name}: TablesInsert<"{table_name}">,
): Promise<Tables<"{table_name}">> => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("{table_name}")
    .insert(feature_name)
    .select()
    .single();

  if (error) {
    throw new SupabasePostgrestActionError(error);
  }

  return data;
};
```

### 2. Define Schema

```typescript:app/orgs/[orgSlug]/(features)/{feature-name}/new/create-{feature-name}.schema.ts
import { z } from "zod";

export const Create{FeatureName}FormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  // Add other fields...
});

export type Create{FeatureName}FormValues = z.infer<typeof Create{FeatureName}FormSchema>;
```

### 3. Create Server Action

```typescript:app/orgs/[orgSlug]/(features)/{feature-name}/new/create-{feature-name}.action.ts
"use server";

import { orgProfileAction } from "@/lib/actions/safe-actions";
import { Create{FeatureName}FormSchema } from "./create-{feature-name}.schema";
import { OrganizationMembershipRole } from "@/queries/orgs/organization.type";

export const create{FeatureName}Action = orgProfileAction
.schema(Create{FeatureName}FormSchema)
.metadata({
    actionName: "create{FeatureName}Action",
    roles: OrganizationMembershipRole.options,
})
.action(async ({ parsedInput, ctx: { organization } }) => {
    await create{FeatureName}Query({
        ...parsedInput,
        organization_id: organization.id,
    });

  redirect(`/orgs/${organization.slug}/{feature-name}/${data.id}`);
});
```

### 4. Create Form Component

```tsx:app/orgs/[orgSlug]/(features)/{feature-name}/components/create-{feature-name}-form.tsx
"use client";

import { LoadingButton } from "@/components/loading-button";
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
import { toast } from "sonner";
import { create{FeatureName}Action } from "./create-{feature-name}.action";
import { Create{FeatureName}FormSchema } from "./create-{feature-name}.schema";

export const Create{FeatureName}Form = () => {
  const { form, action, handleSubmitWithAction } = useHookFormAction(
    create{FeatureName}Action,
    zodResolver(Create{FeatureName}FormSchema),
    {
      formProps: {
        defaultValues: {
          name: "",
          // Add other default values...
        },
      },
      actionProps: {
        onSuccess: () => {
          toast.success("Created successfully");
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
                <Input placeholder="Enter name" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <LoadingButton
          type="submit"
          isLoading={action.isPending}
          className="self-end"
        >
          Create
        </LoadingButton>
      </form>
    </Form>
  );
};
```

### 5. Create Page Component

```tsx:app/orgs/[orgSlug]/(features)/{feature-name}/new/page.tsx
import { Create{FeatureName}Form } from "./create-{feature-name}-form";

export default async function {FeatureName}NewPage() {
  return (
    <div className="flex justify-center">
      <Create{FeatureName}Form />
    </div>
  );
}

```

## Update Operations

## Delete Operations

## File Structure

```
app/orgs/[orgSlug]/(features)/{feature-name}/
├── page.tsx
├── {feature-name}-columns.tsx
├── {feature-name}-data-table.tsx
├── components/
│   ├── create-{feature-name}-form.tsx

src/queries/{feature-name}/
├── get-{feature-name}.query.ts
├── create-{feature-name}.query.ts
├── update-{feature-name}.query.ts
└── delete-{feature-name}.query.ts
```

## Best Practices

1. **Server Components**

   - Use RSC by default
   - Only add "use client" for interactive components
   - Wrap loading components in Suspense

2. **Type Safety**

   - Use generated types from Supabase
   - Define strict schemas with Zod
   - Use TypeScript for all components

3. **Error Handling**

   - Display errors with toast notifications
   - Implement proper loading states

4. **Security**

   - Validate all inputs server-side
   - Check permissions in server actions
   - Use prepared statements for queries

5. **UX Considerations**
   - Show loading states
   - Implement optimistic updates
   - Provide clear feedback for actions
