# WNSS Admin Panel - Netlify Deployment Guide

## Your Project is Ready for Deployment! ✅

Your website is fully configured with Supabase database connectivity. Follow these steps to deploy:

---

## Option 1: Deploy via Netlify CLI (Command Line) - RECOMMENDED

### Step 1: You're Already Logged In
✅ You've already logged into Netlify!

### Step 2: Deploy Your Site
Run the following command:
```bash
netlify deploy --prod
```

When prompted, choose:
1. **"+ Create & configure a new project"**
2. Choose your team
3. Enter a site name (e.g., `wnss-admin-panel` or leave blank for auto-generated name)
4. **Build Command**: `npm run build`
5. **Publish Directory**: `.next`

The CLI will automatically build and deploy your site!

---

## Option 2: Deploy via Netlify Dashboard (Web UI) - EASIEST

### Step 1: Push Your Code to GitHub (Optional but Recommended)
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main
```

### Step 2: Connect to Netlify
1. Go to https://app.netlify.com
2. Click **"Add new site"** > **"Import an existing project"**
3. Connect your GitHub repository
4. Netlify will auto-detect Next.js settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `.next`

### Step 3: Add Environment Variables
Before deploying, you MUST add these environment variables in Netlify:

1. In your Netlify site dashboard, go to **Site settings** > **Environment variables**
2. Add these variables:

```
NEXT_PUBLIC_SUPABASE_URL = https://tccbnjsgrmpqhdaqzwtv.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRjY2JuanNncm1wcWhkYXF6d3R2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIzNjA4NzMsImV4cCI6MjA3NzkzNjg3M30.LfiHYOrheirBbHZ8n2b5GTmTg3vK9Iglo4o3tPYg73s
```

### Step 4: Deploy
Click **"Deploy site"** and Netlify will build and deploy your site!

---

## Option 3: Manual Deploy (Drag & Drop)

### Step 1: Build Your Site Locally
```bash
npm run build
```

### Step 2: Deploy the `.next` Folder
1. Go to https://app.netlify.com/drop
2. Drag and drop the `.next` folder from your project
3. Your site will be deployed instantly!

**Note**: You still need to add environment variables (see Step 3 above) after deployment.

---

## 🗄️ Database Connectivity - IMPORTANT!

### Your Database is Already Connected! ✅
- **Supabase URL**: https://tccbnjsgrmpqhdaqzwtv.supabase.co
- Your admin panel will automatically connect to this database once deployed

### What Data Can Your Admin Panel Manage?
Your deployed site will be able to:
- ✅ **Add/Edit/Delete Books** - Data is saved to Supabase `books` table
- ✅ **Manage Subjects** - Data is saved to Supabase `subjects` table
- ✅ **View Analytics** - Read from your database
- ✅ **Handle Book Requests** - Manage requests in `book_requests` table

### Required Database Tables
Make sure these tables exist in your Supabase database:
1. `books` - Store book information
2. `subjects` - Store subject categories
3. `book_requests` - Store book requests from students
4. `admin_users` - Store admin user accounts

**You can create these tables using the Supabase dashboard SQL editor.**

---

## 📝 Post-Deployment Checklist

After deployment:
1. ✅ Visit your deployed site URL (e.g., https://your-site-name.netlify.app)
2. ✅ Test login functionality
3. ✅ Test adding a book (it should save to Supabase)
4. ✅ Verify data appears in Supabase dashboard
5. ✅ Set up custom domain (optional)

---

## 🚀 Quick Deploy Commands

If you want to redeploy after making changes:

```bash
# Build and deploy to production
npm run build
netlify deploy --prod

# Or deploy a draft for testing
netlify deploy
```

---

## 🔒 Security Notes

1. **Environment Variables**: Your Supabase credentials are stored securely in Netlify
2. **Authentication**: The admin panel uses password authentication (key: 'WNSS2026')
3. **Database Security**: Configure Row Level Security (RLS) in Supabase for better protection

---

## 📚 Useful Links

- **Netlify Dashboard**: https://app.netlify.com
- **Supabase Dashboard**: https://app.supabase.com
- **Your Supabase Project**: https://app.supabase.com/project/tccbnjsgrmpqhdaqzwtv

---

## ❓ Troubleshooting

### Build Fails
- Check that all dependencies are installed: `npm install`
- Verify environment variables are set correctly in Netlify

### Database Connection Issues
- Verify Supabase URL and API key in Netlify environment variables
- Check that your Supabase project is active
- Ensure database tables are created

### Site Not Loading
- Check Netlify deploy logs for errors
- Verify publish directory is set to `.next`
- Ensure build command is `npm run build`

---

**Need Help?** Check the Netlify and Supabase documentation or contact support.
