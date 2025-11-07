# WNSS Library Admin Panel

A comprehensive admin dashboard for managing the WNSS Digital Library, built with:

- Next.js 14
- Tailwind CSS
- Supabase
- Lucide Icons

## Features

- 📚 Book management
- 📖 Subject categorization
- 📊 Analytics dashboard
- 📋 Book request management
- ⚙️ Admin settings

## Setup

1. Clone the repository
2. Install dependencies: `npm install`
3. Create `.env.local` with your Supabase credentials
4. Run development server: `npm run dev`

## Environment Variables

```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-key
```

## Deployment

### Deploy to Netlify (Recommended)

Your project is ready for Netlify deployment with full database connectivity!

**Quick Deploy:**
```bash
# Login to Netlify
netlify login

# Deploy to production
netlify deploy --prod
```

Or use the deployment script:
```bash
deploy.bat
```

**📖 For detailed deployment instructions, see [DEPLOYMENT-GUIDE.md](./DEPLOYMENT-GUIDE.md)**

### Environment Variables in Production

When deploying to Netlify, add these environment variables in your site settings:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## Database Setup

This admin panel connects to Supabase and requires the following tables:
- `books` - Book library
- `subjects` - Subject categories
- `book_requests` - Student book requests
- `admin_users` - Admin accounts

**Your app will automatically feed data to these tables when you add/edit content through the admin panel.**
