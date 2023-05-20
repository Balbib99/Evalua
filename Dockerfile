# Imagen base para el contenedor
FROM node:latest

# Directorio de trabajo en el contenedor
WORKDIR /app

# Copiar archivos de dependencias
COPY client/package.json client/package-lock.json ./client/
COPY server/package.json server/package-lock.json ./server/

# Instalar dependencias del cliente
RUN cd client && npm install

# Instalar dependencias del servidor
RUN cd server && npm install

# Copiar el código fuente
COPY . .

# Compilar la aplicación del cliente
RUN cd client && npm run build

# Exponer el puerto del servidor
EXPOSE 3000

# Comando para ejecutar el servidor
CMD [ "node", "server/server.js" ]
