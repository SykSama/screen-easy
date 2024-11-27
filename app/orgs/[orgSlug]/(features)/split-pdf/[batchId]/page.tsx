import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

import { getBatchWithJobs } from "@/query/pdf-batch-jobs/pdf-batch.query";
import type { PageParams } from "@/types/next";
import { format } from "date-fns";
import {
  AlertCircleIcon,
  CheckCircle2Icon,
  Clock3Icon,
  FileIcon,
  RefreshCwIcon,
  XCircleIcon,
} from "lucide-react";
import { Suspense } from "react";
import { startSplitPdfJob } from "../utils";

export default async function BatchPage(
  props: PageParams<{ batchId: string }>,
) {
  const { batchId } = await props.params;

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <Suspense fallback={<div>Loading...</div>}>
        <BatchDetail batchId={batchId} />
      </Suspense>
    </div>
  );
}

const statusIcons = {
  pending: Clock3Icon,
  processing: AlertCircleIcon,
  completed: CheckCircle2Icon,
  failed: XCircleIcon,
} as const;

const statusColors = {
  pending: "bg-yellow-500",
  processing: "bg-blue-500",
  completed: "bg-green-500",
  failed: "bg-red-500",
} as const;

export const BatchDetail = async ({ batchId }: { batchId: string }) => {
  const batch = await getBatchWithJobs(batchId);
  const progress = (batch.completed_files / batch.total_files) * 100;
  const StatusIcon = statusIcons[batch.status];

  return (
    <div className="space-y-6">
      {/* Batch Overview Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Batch Processing</span>
            <Badge
              variant="secondary"
              className={cn("text-white", statusColors[batch.status])}
            >
              <StatusIcon className="mr-1 size-4" />
              {batch.status.toUpperCase()}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Progress value={progress} className="h-2" />
              <div className="mt-2 flex justify-between text-sm text-muted-foreground">
                <span>
                  {batch.completed_files} of {batch.total_files} completed
                </span>
                <span>{Math.round(progress)}%</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Created</p>
                <p>{format(new Date(batch.created_at), "PPp")}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Failed Files</p>
                <p>{batch.failed_files}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Job Type</p>
                <p className="capitalize">{batch.job_type}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Jobs List */}
      <Card>
        <CardHeader>
          <CardTitle>Jobs</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {batch.pdf_jobs.map((job) => (
              <Card key={job.id}>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <FileIcon className="size-6 text-muted-foreground" />
                      <div>
                        <p className="font-medium">{job.original_filename}</p>
                        <p className="text-sm text-muted-foreground">
                          Processing Configuration:{" "}
                          {JSON.stringify(job.processing_config)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <form
                        action={async () => {
                          "use server";
                          await startSplitPdfJob(job.id);
                        }}
                      >
                        <Button
                          type="submit"
                          size="sm"
                          variant="outline"
                          className="gap-1.5"
                        >
                          <RefreshCwIcon className="size-4" />
                          Retry
                        </Button>
                      </form>
                      <Badge
                        variant="secondary"
                        className={cn("text-white", statusColors[job.status])}
                      >
                        {job.status.toUpperCase()}
                      </Badge>
                    </div>
                  </div>

                  {job.error_message && (
                    <div className="mt-2 text-sm text-red-500">
                      {job.error_message}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
