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

# Exponer el puerto en el que la aplicación servirá
EXPOSE 80

# Comando para iniciar nodemon, observando archivos y ejecutando el servidor de desarrollo de React
CMD ["npx", "nodemon", "-L", "--watch", "src", "--exec", "npm start"]