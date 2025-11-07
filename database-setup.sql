-- WNSS Admin Panel - Supabase Database Setup
-- Run this SQL in your Supabase SQL Editor to create all required tables

-- ============================================
-- 1. BOOKS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS public.books (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    author TEXT NOT NULL,
    level TEXT NOT NULL CHECK (level IN ('O', 'A')),
    class TEXT,
    subject TEXT NOT NULL,
    description TEXT,
    keywords TEXT[],
    cover_url TEXT,
    file_url TEXT,
    featured BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index for better search performance
CREATE INDEX IF NOT EXISTS idx_books_level ON public.books(level);
CREATE INDEX IF NOT EXISTS idx_books_subject ON public.books(subject);
CREATE INDEX IF NOT EXISTS idx_books_featured ON public.books(featured);

-- ============================================
-- 2. SUBJECTS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS public.subjects (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    icon TEXT,
    color TEXT,
    level TEXT NOT NULL CHECK (level IN ('O', 'A', 'BOTH')),
    display_order INTEGER DEFAULT 0,
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index for active subjects
CREATE INDEX IF NOT EXISTS idx_subjects_active ON public.subjects(active);
CREATE INDEX IF NOT EXISTS idx_subjects_level ON public.subjects(level);

-- ============================================
-- 3. BOOK REQUESTS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS public.book_requests (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    book_title TEXT NOT NULL,
    author TEXT NOT NULL,
    subject TEXT NOT NULL,
    class_level TEXT NOT NULL,
    reason TEXT,
    status TEXT DEFAULT 'PENDING' CHECK (status IN ('PENDING', 'APPROVED', 'REJECTED', 'FULFILLED')),
    student_name TEXT,
    student_email TEXT,
    date_requested TIMESTAMPTZ DEFAULT NOW(),
    date_updated TIMESTAMPTZ DEFAULT NOW(),
    admin_notes TEXT
);

-- Create index for status queries
CREATE INDEX IF NOT EXISTS idx_book_requests_status ON public.book_requests(status);
CREATE INDEX IF NOT EXISTS idx_book_requests_date ON public.book_requests(date_requested DESC);

-- ============================================
-- 4. ADMIN USERS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS public.admin_users (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email TEXT NOT NULL UNIQUE,
    full_name TEXT NOT NULL,
    role TEXT DEFAULT 'moderator' CHECK (role IN ('admin', 'moderator')),
    is_active BOOLEAN DEFAULT true,
    last_login TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index for email lookups
CREATE INDEX IF NOT EXISTS idx_admin_users_email ON public.admin_users(email);
CREATE INDEX IF NOT EXISTS idx_admin_users_active ON public.admin_users(is_active);

-- ============================================
-- 5. FUNCTIONS AND TRIGGERS
-- ============================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for auto-updating updated_at
DROP TRIGGER IF EXISTS update_books_updated_at ON public.books;
CREATE TRIGGER update_books_updated_at
    BEFORE UPDATE ON public.books
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_subjects_updated_at ON public.subjects;
CREATE TRIGGER update_subjects_updated_at
    BEFORE UPDATE ON public.subjects
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_book_requests_updated_at ON public.book_requests;
CREATE TRIGGER update_book_requests_updated_at
    BEFORE UPDATE ON public.book_requests
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- 6. SAMPLE DATA (Optional)
-- ============================================

-- Insert sample subjects
INSERT INTO public.subjects (name, icon, color, level, display_order) VALUES
('Mathematics', '📐', '#3B82F6', 'BOTH', 1),
('Physics', '⚛️', '#8B5CF6', 'BOTH', 2),
('Chemistry', '🧪', '#10B981', 'BOTH', 3),
('Biology', '🧬', '#14B8A6', 'BOTH', 4),
('English', '📚', '#EF4444', 'BOTH', 5),
('History', '📜', '#F59E0B', 'BOTH', 6),
('Geography', '🌍', '#06B6D4', 'BOTH', 7),
('Literature', '📖', '#EC4899', 'O', 8),
('Computer Science', '💻', '#6366F1', 'A', 9),
('Economics', '💰', '#84CC16', 'A', 10)
ON CONFLICT (name) DO NOTHING;

-- ============================================
-- 7. ROW LEVEL SECURITY (RLS) - Optional but Recommended
-- ============================================

-- Enable RLS on tables
ALTER TABLE public.books ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subjects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.book_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- Allow public read access (adjust based on your security needs)
CREATE POLICY "Allow public read access" ON public.books
    FOR SELECT USING (true);

CREATE POLICY "Allow public read access" ON public.subjects
    FOR SELECT USING (true);

-- Allow authenticated users to insert/update/delete
-- Note: You'll need to implement proper authentication
-- This is a basic example - adjust based on your auth system

CREATE POLICY "Allow authenticated insert" ON public.books
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow authenticated update" ON public.books
    FOR UPDATE USING (true);

CREATE POLICY "Allow authenticated delete" ON public.books
    FOR DELETE USING (true);

-- Similar policies for subjects
CREATE POLICY "Allow authenticated insert" ON public.subjects
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow authenticated update" ON public.subjects
    FOR UPDATE USING (true);

CREATE POLICY "Allow authenticated delete" ON public.subjects
    FOR DELETE USING (true);

-- Book requests policies
CREATE POLICY "Allow public insert" ON public.book_requests
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public read" ON public.book_requests
    FOR SELECT USING (true);

CREATE POLICY "Allow authenticated update" ON public.book_requests
    FOR UPDATE USING (true);

-- ============================================
-- SETUP COMPLETE!
-- ============================================

-- Verify tables were created
SELECT 
    schemaname,
    tablename,
    tableowner
FROM pg_tables 
WHERE schemaname = 'public' 
AND tablename IN ('books', 'subjects', 'book_requests', 'admin_users');
