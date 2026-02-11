@echo off
title AI Fashion Server Launcher
color 0b

echo ====================================================
echo       AI Fashion Project - Server Launcher
echo ====================================================
echo.
echo [1] Starting MCP Fashion Server (Port 8002)...
start "MCP Fashion Server (8002)" cmd /k "fastmcp run server.py --transport sse --port 8002"

timeout /t 2 >nul

echo [2] Starting API Gateway Server (Port 8004)...
start "API Gateway Server (8004)" cmd /k "python api_server.py"

echo.
echo ====================================================
echo    All Servers Started Successfully! 🚀
echo ====================================================
echo.
echo  * Do not close the opened black terminal windows.
echo  * If you want to stop servers, just close those windows.
echo.
pause
