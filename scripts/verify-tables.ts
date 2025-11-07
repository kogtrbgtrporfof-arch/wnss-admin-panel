import { supabase } from '../lib/supabase';

async function checkTables() {
  try {
    console.log('Checking books table...');
    const { data: books, error: booksError } = await supabase.from('books').select('*').limit(1);
    if (booksError) throw booksError;
    console.log('✅ Books table exists with', books?.length || 0, 'records');

    console.log('Checking book_requests table...');
    const { data: requests, error: requestsError } = await supabase.from('book_requests').select('*').limit(1);
    if (requestsError) throw requestsError;
    console.log('✅ Book requests table exists with', requests?.length || 0, 'records');

    console.log('Checking subjects table...');
    const { data: subjects, error: subjectsError } = await supabase.from('subjects').select('*').limit(1);
    if (subjectsError) throw subjectsError;
    console.log('✅ Subjects table exists with', subjects?.length || 0, 'records');

    console.log('Checking admin_users table...');
    const { data: users, error: usersError } = await supabase.from('admin_users').select('*').limit(1);
    if (usersError) throw usersError;
    console.log('✅ Admin users table exists with', users?.length || 0, 'records');
  } catch (error) {
    console.error('❌ Error verifying tables:', error);
    process.exit(1);
  }
}

checkTables();
