import { Badge } from "@/components/ui/badge";
import { formatBytes } from "@/lib/utils";
import type { GetMediaOutput } from "@/queries/media/get-media.query";
import { format } from "date-fns";

type MediaHeaderProps = {
  media: GetMediaOutput;
};

export const MediaHeader = ({ media }: MediaHeaderProps) => {
  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-3xl font-bold">{media.name}</h1>
      {media.description && (
        <p className="text-muted-foreground">{media.description}</p>
      )}
      <div className="flex items-center gap-4 text-sm">
        <Badge variant={media.status === "ready" ? "default" : "destructive"}>
          {media.status}
        </Badge>
        <span className="text-muted-foreground">
          {media.file_size ? formatBytes(media.file_size) : "Unknown size"}
        </span>
        <span className="text-muted-foreground">•</span>
        <span className="text-muted-foreground">
          Uploaded {format(new Date(media.created_at), "PPP")}
        </span>
      </div>
    </div>
  );
};
