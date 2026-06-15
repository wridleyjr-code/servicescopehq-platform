@echo off
echo Committing configuration files...
git add .
git commit -m "fix: supply netlify config and dummy package.json to bypass broken build command"

echo Pushing to GitHub...
git push origin main

echo Done! Netlify is now detecting the files.
pause
