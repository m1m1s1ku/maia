import { createClient } from '@supabase/supabase-js';

const supabase = createClient('https://ljagkfxmyqdwelyiskwo.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxqYWdrZnhteXFkd2VseWlza3dvIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjE3MTU1NjAsImV4cCI6MTk3NzI5MTU2MH0.6-3vbXiOynjIYkFKx73Eh0d-XtOuzhYYi0EfYDFQBdU');

export default supabase;

export const auth = supabase.auth;