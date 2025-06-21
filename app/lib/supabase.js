import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://pnqdnwetvmbmzhntclnq.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBucWRud2V0dm1ibXpobnRjbG5xIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAzODAyNDksImV4cCI6MjA2NTk1NjI0OX0.e8duU05rOmFMhTsiND1aqRJ4S3IvALu2Tqp5iHeMp_E";

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Kesalahan: Variabel lingkungan SUPABASE_URL atau SUPABASE_ANON_KEY tidak diatur.");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);