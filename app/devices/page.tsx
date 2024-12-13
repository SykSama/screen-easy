import { createClient } from "@/utils/supabase/server";
import { WaitingDevice } from "./waiting-device";

export default async function RoutePage() {
  const supabase = await createClient();

  //generate a random uuid
  const deviceId = crypto.randomUUID();

  // generate an otp code
  const otpCode = Math.floor(100000 + Math.random() * 900000).toString();

  // insert into device_waiting
  const { data, error } = await supabase.from("device_waiting").insert({
    id: deviceId,
    otp_code: otpCode,
  });

  return <WaitingDevice deviceId={deviceId} otpCode={otpCode} />;
}
