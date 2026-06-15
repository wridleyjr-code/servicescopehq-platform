@echo off
<<<<<<< HEAD
<<<<<<< HEAD
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
=======
=======
echo Synchronizing with GitHub remote...
git pull origin main --rebase

>>>>>>> 6c411e7 (feat: integrated interactive MRR modeling simulator and directory search wireframes)
echo Staging updated files...
git add .

echo Committing files...
git commit -m "feat: integrated interactive MRR modeling simulator and directory search wireframes"

echo Pushing to GitHub origin main repository...
git push origin main

echo Push complete!
>>>>>>> 7866196 (feat: integrated interactive MRR modeling simulator and directory search wireframes)
pause
