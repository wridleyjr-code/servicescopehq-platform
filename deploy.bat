@echo off
echo Preparing to deploy updates...
git add .
git commit -m "Update core platform codebase"

echo Pushing updates to GitHub and Netlify...
git push origin main --force

echo ========================================================
echo SUCCESS! Your changes have been pushed.
echo 
echo IMPORTANT: If you don't see the changes on your live site
echo after 1 minute, try holding down SHIFT and clicking the
echo Refresh button in your browser to clear the cache.
echo ========================================================
pause
