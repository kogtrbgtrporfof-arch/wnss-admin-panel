@echo off
echo ================================
echo WNSS Admin Panel - Deploy Script
echo ================================
echo.

echo Step 1: Building project...
call npm run build

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo ❌ Build failed! Please fix errors and try again.
    pause
    exit /b 1
)

echo.
echo ✅ Build successful!
echo.
echo Step 2: Deploying to Netlify...
echo.
echo Please follow the prompts:
echo 1. Choose "Create & configure a new project"
echo 2. Select your team
echo 3. Enter site name or press Enter for auto-generated name
echo.
call netlify deploy --prod

echo.
echo ================================
echo Deployment process complete!
echo ================================
echo.
echo Don't forget to:
echo 1. Set environment variables in Netlify dashboard
echo 2. Verify your database connection
echo.
echo See DEPLOYMENT-GUIDE.md for detailed instructions
echo.
pause
