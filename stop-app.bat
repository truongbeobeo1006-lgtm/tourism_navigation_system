@echo off
chcp 65001 >nul
title DUNG HE THONG QUAN LI DU LICH QUAN 1
color 0c

echo =========================================================================
echo    🛑  DỪNG TOÀN BỘ HỆ THỐNG QUẢN LÍ DU LỊCH QUẬN 1
echo =========================================================================
echo.

echo Đang đóng tiến trình Node.js server...
taskkill /f /im node.exe >nul 2>&1

echo Đang đóng tiến trình Cloudflare tunnel...
taskkill /f /im cloudflared.exe >nul 2>&1

echo.
echo ✅ Đã dừng toàn bộ dịch vụ an toàn!
echo.
pause
