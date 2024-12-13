import { createClient } from "@/utils/supabase/server";

export default async function RoutePage() {
  const supabase = await createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) {
    return <div>not logged</div>;
  }

  // Insert into device here ?

  return <div>user: {user?.email}</div>;
}
