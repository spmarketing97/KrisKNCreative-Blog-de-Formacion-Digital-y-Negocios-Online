#!/bin/bash

# Script de inicio para KrisKNCreative

echo "========================================"
echo "  KrisKNCreative - Iniciando Servidor"
echo "========================================"
echo ""

# Verificar Python
if ! command -v python3 &> /dev/null; then
    echo "ERROR: Python3 no está instalado"
    echo "Por favor instala Python 3.8 o superior"
    exit 1
fi

echo "[1/3] Verificando dependencias..."
if ! python3 -c "import flask" &> /dev/null; then
    echo "Instalando dependencias..."
    pip3 install -r requirements.txt
else
    echo "Dependencias OK"
fi

echo ""
echo "[2/3] Iniciando servidor backend..."
echo ""
echo "========================================"
echo " Servidor: http://localhost:5000"
echo " Presiona CTRL+C para detener"
echo "========================================"
echo ""

# Iniciar servidor
python3 server.py
