import { createClient } from '@supabase/supabase-js';

// ✅ Access environment variables in Vite
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// ✅ Safety check: warn if env variables are missing
if (!supabaseUrl || !supabaseKey) {
  console.error("❌ Supabase URL:", supabaseUrl);
  console.error("❌ Supabase Anon Key:", supabaseKey);
  throw new Error(
    "❌ Supabase URL and Anon Key are required. Make sure your `.env` file includes:\n\n" +
    "VITE_SUPABASE_URL=your-url\n" +
    "VITE_SUPABASE_ANON_KEY=your-anon-key\n\n" +
    "And restart the dev server after saving changes."
  );
}

// ✅ Export configured client
export const supabase = createClient(supabaseUrl, supabaseKey);
