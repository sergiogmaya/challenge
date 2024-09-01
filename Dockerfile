FROM node:22

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /usr/src/app

# Copia los archivos de package.json y package-lock.json
COPY package*.json ./

# Instala las dependencias de la aplicación
RUN npm install

# Copia el resto del código de la aplicación
COPY . .

# Compila el código TypeScript
RUN npm install -g ts-node-dev typescript

# Expone el puerto en el que correrá la aplicación
EXPOSE 5000

# Comando para iniciar la aplicación
CMD ["npm", "run", "dev"]