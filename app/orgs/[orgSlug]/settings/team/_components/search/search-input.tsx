"use client";

import { Input } from "@/components/ui/input";
import { cn } from "@/utils/cn";
import { Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import { useDebouncedCallback } from "use-debounce";

export const SearchInput = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const [isPending, startTransition] = useTransition();

  const handleSearch = (term: string) => {
    const params = new URLSearchParams(searchParams);

    if (term) {
      params.set("searchQuery", term);
    } else {
      params.delete("searchQuery");
    }

    startTransition(() => {
      replace(`${pathname}?${params.toString()}`);
    });
  };

  const debouncedSearch = useDebouncedCallback(handleSearch, 300);

  return (
    <div className="flex items-center gap-2">
      <div
        className={cn(
          "relative flex max-w-2xl items-center",
          isPending && "animate-[pulse_800ms_ease-in-out_infinite]",
        )}
      >
        <Search className="absolute left-2 top-1/2 size-4 -translate-y-1/2" />
        <Input
          placeholder="Filter members"
          className="pl-8"
          onChange={(e) => {
            debouncedSearch(e.target.value);
          }}
          defaultValue={searchParams.get("searchQuery")?.toString()}
        />
      </div>
      {/* {isPending && <Icons.spinner className="size-5 animate-spin" />} */}
    </div>
  );
};
