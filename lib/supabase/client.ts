import { createClient } from '@supabase/supabase-js'

// Replace these with the actual values from your Supabase Dashboard
const supabaseUrl = 'https://fphaxcfimqusdobdjxpf.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZwaGF4Y2ZpbXF1c2RvYmRqeHBmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg4OTg2NTQsImV4cCI6MjA4NDQ3NDY1NH0.kk0tilynQKjSFCqF7Xo0aJcvtYfPMOMVdF0WjiVqOmI' // Paste your FULL long key here

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
