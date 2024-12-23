"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

type MediaNameCellProps = {
  id: string;
  name: string;
  description: string | null;
};

export const MediaNameCell = ({
  id,
  name,
  description,
}: MediaNameCellProps) => {
  const params = useParams();
  return (
    <Link
      href={`/orgs/${params.orgSlug}/medias/${id}`}
      className="block hover:underline"
    >
      <div className="flex flex-col">
        <span className="line-clamp-1 font-medium">{name}</span>
        {description && (
          <span className=" line-clamp-1 text-sm text-muted-foreground">
            {description}
          </span>
        )}
      </div>
    </Link>
  );
};
