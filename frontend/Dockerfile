FROM node:22 AS build

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos de package.json y package-lock.json
COPY package*.json ./

# Instala las dependencias de la aplicación
RUN npm install

# Copia el resto del código de la aplicación
COPY . .

# Construir la aplicación
RUN npm run build

# Usar una imagen base para servir la aplicación
FROM nginx:alpine

# Copiar los archivos construidos al contenedor de Nginx
COPY --from=build /app/build /usr/share/nginx/html

# Exponer el puerto en el que la aplicación servirá
EXPOSE 80

# Comando para ejecutar Nginx
CMD ["nginx", "-g", "daemon off;"]