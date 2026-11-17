@echo off
title KHOI DONG HE THONG QUAN LI DU LICH QUAN 1
color 0b

echo =========================================================================
echo   HE THONG QUAN LI DU LICH QUAN 1 - 1-CLICK LAUNCHER
echo =========================================================================
echo.

cd /d "%~dp0"

taskkill /f /im node.exe >nul 2>&1
taskkill /f /im cloudflared.exe >nul 2>&1

echo [1/3] Dang khoi dong Server Node.js tai http://localhost:3000 ...
start /b node client-web\server.js > server.log 2>&1

timeout /t 2 /nobreak >nul

echo [2/3] Dang ket noi duong ham Cloudflare (Cho 4G / tu xa)...
start /b cloudflared.exe tunnel --protocol http2 --url http://127.0.0.1:3000 > tunnel.log 2>&1

echo [3/3] Dang cho cap ten mien cong khai va mo ma QR...
timeout /t 5 /nobreak >nul

node -e "const fs=require('fs'),cp=require('child_process');let n=0;(function f(){n++;try{if(fs.existsSync('tunnel.log')){const m=fs.readFileSync('tunnel.log','utf8').match(/https:\/\/[a-z0-9-]+\.trycloudflare\.com/);if(m){const u=m[0];fs.writeFileSync('tunnel-url.txt',u,'utf8');const t=u+'/?ticket=TOUR-PASS-DEMO-24H';console.log('');console.log('=========================================================================');console.log('HE THONG DA KHOI DONG THANH CONG!');console.log('Admin CMS:         http://localhost:3000/admin/');console.log('Trang Ma QR:       http://localhost:3000/qr');console.log('LINK DIEN THOAI:   '+t);console.log('=========================================================================');cp.exec('start http://localhost:3000/qr');return;}}}catch(e){}if(n<15){setTimeout(f,1500);}else{console.log('Khong tim thay link Cloudflare, hay dung http://localhost:3000');}})();"

echo.
echo Dang mo trang Quan tri tren trinh duyet...
start http://localhost:3000/admin/

echo.
echo [LUU Y] Khong tat cua so nay khi dang demo!
echo Nhan Ctrl + C hoac chay stop-app.bat de dung he thong.
echo.
pause >nul
