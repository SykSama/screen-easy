"use client";

import type { Tables } from "@/types";
import { createClient } from "@/utils/supabase/client";

export type WaitingDeviceProps = {
  deviceId: string;
  otpCode: string;
};

export const WaitingDevice = (props: WaitingDeviceProps) => {
  const supabase = createClient();

  supabase
    .channel("device_waiting")
    .on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "device_waiting",
        filter: `id=eq.${props.deviceId}`,
      },
      (payload) => {
        const deviceWaiting = payload.new as Tables<"device_waiting">;
        console.log("Device waiting", deviceWaiting);
      },
    )
    .subscribe();

  return <div>{props.otpCode}</div>;
};
