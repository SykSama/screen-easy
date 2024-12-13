"use client";

import type { Tables } from "@/types";
import { createClient } from "@/utils/supabase/client";
import type { RealtimePostgresChangesPayload } from "@supabase/supabase-js";
import { useEffect } from "react";
import { loginOtp } from "./login-otp";

export type WaitingDeviceProps = {
  deviceId: string;
  otpCode: string;
};

export const WaitingDevice = (props: WaitingDeviceProps) => {
  const supabase = createClient();

  const handlePayload = async (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    payload: RealtimePostgresChangesPayload<Record<string, any>>,
  ) => {
    const deviceWaiting = payload.new as Tables<"device_waiting">;

    if (!deviceWaiting.sign_in_otp_code || !deviceWaiting.organization_email) {
      console.error("No OTP code or organization email");
      return;
    }

    await loginOtp(
      deviceWaiting.sign_in_otp_code,
      deviceWaiting.organization_email,
    );
  };

  useEffect(() => {
    const channel = supabase
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
          void handlePayload(payload);
        },
      )
      .subscribe();

    return () => {
      void channel.unsubscribe();
    };
  }, []);

  return <div>{props.otpCode}</div>;
};
