import { createClient } from '@supabase/supabase-js';

// Modificado de la API
const supabaseUrl = 'https://ujgpalltodfpfyxuezlw.supabase.co';
const supabaseKey = 'sb_publishable_iKshLS4jUagm1rsfqrgpsA__GDCQ3bG';

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false 
  }
});
