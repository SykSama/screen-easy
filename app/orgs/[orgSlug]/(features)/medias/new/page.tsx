import { CreateMediaForm } from "./create-media-form";

export default async function MediasNewPage() {
  return (
    <div className="grow p-6 lg:rounded-lg lg:p-10 lg:shadow-sm">
      <div className="mx-auto max-w-6xl">
        <CreateMediaForm />
      </div>
    </div>
  );
}
