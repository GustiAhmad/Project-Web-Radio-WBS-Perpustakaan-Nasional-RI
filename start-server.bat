@echo off
title Radio WBS Perpusnas - Preview Server
cd /d "%~dp0"

echo ==================================================
echo  Radio ^& Siniar WBS Perpusnas - Local Preview
echo ==================================================
echo.

if not exist "node_modules\" (
  echo First run: installing dependencies. Please wait...
  echo.
  call npm install
  if errorlevel 1 goto gagal
)

echo Starting the preview server...
echo Your browser will open automatically.
echo Close this window or press Ctrl+C to stop the server.
echo.

call npm run dev -- --open
if errorlevel 1 goto gagal
exit /b 0

:gagal
echo.
echo Server failed to start. See the messages above.
echo.
pause
exit /b 1
