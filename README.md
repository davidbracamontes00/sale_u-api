# Aplicación de Automatización

Aplicación local desarrollada para automatizar procesos internos mediante una interfaz web ejecutada desde un entorno local.

## Versión

**Versión inicial**

## Descripción

El proyecto utiliza una interfaz HTML/JavaScript y un backend en Python para ejecutar procesos automatizados desde una aplicación local.

La aplicación cuenta con un sistema de lanzamiento que inicia los servicios necesarios para que el usuario pueda utilizar la interfaz sin realizar configuraciones manuales.

## Estructura del proyecto

```text
PROYECTO/
│
├── favicon.ico
├── INDEX.html
├── launcher.py
├── launcher.spec
├── main.py
├── SERVER.js
│
├── build/          # Archivos generados por PyInstaller
├── dist/           # Aplicación compilada
└── __pycache__/    # Archivos temporales de Python
