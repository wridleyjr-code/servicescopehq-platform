@echo off
echo ========================================================
echo ServiceScopeHQ: GitHub Push Initialization
echo ========================================================
echo.

:: Check if git is installed
where git >nul 2>nul
if %ERRORLEVEL% neq 0 (
    echo [ERROR] Git is not installed or not in your system PATH!
    echo Please install Git from https://git-scm.com/download/win and run this again.
    pause
    exit /b
)

echo [1/4] Initializing local Git repository...
git init
git branch -M main

echo [2/4] Staging all project assets...
git add .

echo [3/4] Committing initial branded launch...
git commit -m "initial commit: scaffold core architecture and 29 niches for ServiceScopeHQ"

echo [4/4] Linking remote and pushing to GitHub...
git push -u origin main

echo.
echo ========================================================
echo SUCCESS! Your code has been pushed to GitHub.
echo You can now connect Netlify to this repository.
echo ========================================================
pause
