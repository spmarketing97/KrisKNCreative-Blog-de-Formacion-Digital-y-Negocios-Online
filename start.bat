@echo off
title KrisKNCreative - Servidor Backend
echo ========================================
echo   KrisKNCreative - Iniciando Servidor
echo ========================================
echo.

REM Verificar si Python está instalado
python --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Python no está instalado o no está en el PATH
    echo Por favor instala Python 3.8 o superior desde python.org
    pause
    exit /b 1
)

echo [1/3] Verificando dependencias...
pip show flask >nul 2>&1
if errorlevel 1 (
    echo Instalando dependencias...
    pip install -r requirements.txt
) else (
    echo Dependencias OK
)

echo.
echo [2/3] Iniciando servidor backend...
echo.
echo ========================================
echo  Servidor: http://localhost:5000
echo  Presiona CTRL+C para detener
echo ========================================
echo.

REM Iniciar el servidor
python server.py

pause
