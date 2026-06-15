@echo off
echo Locking local branch to the new architecture...
git branch -f main HEAD
git checkout main

echo Forcing GitHub to accept the new MRR layout...
git push origin main --force

echo Cleaning up temporary backup files...
del /q *.bak 2>nul
del /q data\*.bak 2>nul

echo Done! Netlify is building your new site now.
pause
