import { CreateCollectionForm } from "./create-collection-form";

export default async function CollectionsNewPage() {
  return (
    <div className="grow p-6 lg:rounded-lg lg:p-10 lg:shadow-sm">
      <div className="mx-auto max-w-6xl">
        <CreateCollectionForm />
      </div>
    </div>
  );
}