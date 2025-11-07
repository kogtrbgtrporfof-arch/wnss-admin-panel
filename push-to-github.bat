@echo off
echo ================================
echo Push to GitHub
echo ================================
echo.
echo Before running this script:
echo 1. Create a repository on GitHub at https://github.com/new
echo 2. Name it: wnss-admin-panel
echo 3. DON'T initialize with README
echo.
echo.

set /p username="Enter your GitHub username: "
set /p reponame="Enter repository name (default: wnss-admin-panel): "

if "%reponame%"=="" set reponame=wnss-admin-panel

echo.
echo Setting up remote...
git remote add origin https://github.com/%username%/%reponame%.git

echo.
echo Setting main branch...
git branch -M main

echo.
echo Pushing to GitHub...
git push -u origin main

echo.
echo ================================
echo Done!
echo ================================
echo.
echo Your code is now on GitHub!
echo Repository: https://github.com/%username%/%reponame%
echo.
echo Next: Connect this repo to Netlify for auto-deployment
echo See GITHUB-SETUP.md for instructions
echo.
pause
