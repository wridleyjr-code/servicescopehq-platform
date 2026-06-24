@echo off
echo ========================================================
echo ServiceScopeHQ: Pushing Updates to GitHub
echo ========================================================
echo.

where git >nul 2>nul
if %ERRORLEVEL% neq 0 (
    echo [ERROR] Git is not installed or not in your system PATH!
    echo Please install Git from https://git-scm.com/download/win and run this again.
    pause
    exit /b
)

echo Synchronizing with GitHub remote...
git pull origin main --rebase

echo Staging updated files...
git add .

echo Committing files...
git commit -m "update: project synchronization"

echo Pushing to GitHub origin main repository...
git push origin main

echo Push complete!
pause
