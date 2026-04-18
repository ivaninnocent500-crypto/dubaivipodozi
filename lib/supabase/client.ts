import { createClient } from '@supabase/supabase-js'

/**
 * During 'next build', environment variables are often missing.
 * We provide fallback strings to prevent the 'supabaseUrl is required' 
 * error from crashing the build process.
 */
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://https://fphaxcfimqusdobdjxpf.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-anon-key'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
