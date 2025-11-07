# GitHub Setup Guide

## Steps to Upload Your Project to GitHub

### Step 1: Create a GitHub Repository

1. Go to https://github.com/new
2. Fill in the details:
   - **Repository name**: `wnss-admin-panel` (or your preferred name)
   - **Description**: "WNSS Library Admin Panel - Next.js admin dashboard with Supabase"
   - **Visibility**: Choose Public or Private
   - **DON'T** check "Initialize with README" (we already have one)
3. Click **"Create repository"**

### Step 2: Push Your Code

After creating the repository, GitHub will show you commands. Your project is already initialized and ready!

Just run these commands (I'll help you with this):

```bash
git remote add origin https://github.com/YOUR-USERNAME/wnss-admin-panel.git
git branch -M main
git push -u origin main
```

Replace `YOUR-USERNAME` with your actual GitHub username.

### Step 3: Connect Netlify to GitHub

After uploading to GitHub, you can set up automatic deployments:

1. Go to https://app.netlify.com
2. Click **"Add new site"** > **"Import an existing project"**
3. Choose **"GitHub"**
4. Select your `wnss-admin-panel` repository
5. Netlify will auto-detect settings:
   - Build command: `npm run build`
   - Publish directory: `.next`
6. Add environment variables (see DEPLOYMENT-GUIDE.md)
7. Click **"Deploy site"**

### Benefits of GitHub + Netlify

- 🔄 **Auto-deploy**: Every push to GitHub automatically deploys to Netlify
- 📝 **Version control**: Track all changes
- 🔙 **Easy rollbacks**: Revert to any previous version
- 👥 **Collaboration**: Work with others easily

### Important Files Already Configured

✅ `.gitignore` - Configured to exclude sensitive files
✅ `.env.local` - Excluded from Git (keeps your secrets safe)
✅ `.env.example` - Included as a template for others

### Security Note

Your `.env.local` file (with database credentials) is **NOT** uploaded to GitHub - it's in `.gitignore`. You'll add these credentials in Netlify's dashboard instead.
