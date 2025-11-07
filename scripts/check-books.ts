import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';
import type { Book } from '../lib/supabase';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function main() {
  try {
    const { data, error } = await supabase
      .from('books')
      .select('*')
      .limit(5);

    if (error) throw error;
    console.log('Books sample:', JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Supabase error:', error);
    process.exit(1);
  }
}

main();
