import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://hqkjbzerqdwtnttidzij.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhxa2piemVycWR3dG50dGlkemlqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzczODM0NjcsImV4cCI6MjA5Mjk1OTQ2N30.6W6qOpAeu-8vH8AYAJyvPmzjz-w1F5LlsX42rBrldoE"
);