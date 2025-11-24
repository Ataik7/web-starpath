import { createClient } from '@supabase/supabase-js';

// Modificado de la API
const supabaseUrl = 'https://dinchuobcuhyuncglaun.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRpbmNodW9iY3VoeXVuY2dsYXVuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM3MDk5NjQsImV4cCI6MjA3OTI4NTk2NH0.pfdJDk5yz9_ssCjLO-oByljHCHzUvHgehcTnDIgK7r0';

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false 
  }
});
