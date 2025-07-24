import { createClient } from "@supabase/supabase-js";
import type { Database } from "./types";

if (!import.meta.env.VITE_SUPABASE_URL)
  throw new Error("Missing environment variable: VITE_SUPABASE_URL");
if (!import.meta.env.VITE_SUPABASE_ANON_KEY)
  throw new Error("Missing environment variable: VITE_SUPABASE_ANON_KEY");

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);
