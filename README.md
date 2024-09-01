# Challenge

Este proyecto es una aplicación Express escrita en TypeScript. Utiliza Docker para crear un entorno de desarrollo y producción consistente. A continuación, se detallan los pasos para configurar y ejecutar el proyecto.

## Requisitos

- Docker
- Docker Compose

## Estructura del Proyecto

- `src/`: Contiene el código fuente en TypeScript.
- `build/`: Contiene los archivos JavaScript generados por la compilación de TypeScript.
- `Dockerfile`: Configuración para construir la imagen Docker.
- `docker-compose.yml`: Configuración para los servicios Docker, incluyendo la aplicación y MongoDB.
- `package.json`: Define los scripts y dependencias del proyecto.

## Configuración

### 1. Clonar el Repositorio

```bash
git clone <URL_DEL_REPOSITORIO>
cd <NOMBRE_DEL_REPOSITORIO>
