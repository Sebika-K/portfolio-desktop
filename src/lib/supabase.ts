import { createClient } from "@supabase/supabase-js";

// One shared connection to your Supabase project, used by the whole site.
// Any file that needs the database imports `supabase` from here, so the
// URL and key are only ever read in this one place.
export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
);
