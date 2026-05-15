@echo off
title PurplePrison Staff Checker
color 5F

echo.
echo  ========================================
echo      PURPLEPRISON STAFF CHECKER
echo  ========================================
echo.
echo  Starting application...
echo.

:: Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% neq 0 (
    echo  [ERROR] Node.js is not installed!
    echo  Please install Node.js from https://nodejs.org
    echo.
    pause
    exit /b 1
)

:: Check if pnpm is installed, if not use npm
where pnpm >nul 2>nul
if %ERRORLEVEL% equ 0 (
    set PKG_MANAGER=pnpm
) else (
    set PKG_MANAGER=npm
)

:: Install dependencies if node_modules doesn't exist
if not exist "node_modules" (
    echo  Installing dependencies...
    call %PKG_MANAGER% install
    echo.
)

:: Build the application if .next doesn't exist
if not exist ".next" (
    echo  Building application...
    call %PKG_MANAGER% run build
    echo.
)

echo  ========================================
echo    Application is starting...
echo    Open http://localhost:3000 in browser
echo  ========================================
echo.
echo  Press Ctrl+C to stop the application
echo.

:: Start the application
call %PKG_MANAGER% run start
