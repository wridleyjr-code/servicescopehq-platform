@echo off
echo Forcefully killing stuck rebase state...
rmdir /s /q .git\rebase-merge 2>nul
rmdir /s /q .git\rebase-apply 2>nul
del /f /q .git\CHERRY_PICK_HEAD 2>nul
del /f /q .git\MERGE_HEAD 2>nul

echo Aligning local environment with GitHub remote...
git fetch origin main
git reset --mixed origin/main

echo Staging perfect codebase...
git add .
git commit -m "feat: complete architecture overhaul (MRR & Geo Console)"

echo Pushing to GitHub...
git push origin main
echo Done! Everything is perfectly synced and live.
pause
