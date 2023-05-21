#!/bin/bash

# Construir el contenedor para la base de datos
echo "Construyendo el contenedor para la base de datos..."
docker build -t mysql -f Dockerfile.mysql .



# Construir el contenedor para el backend
echo "Construyendo el contenedor para el backend..."
docker build -t server -f Dockerfile.server .

# Construir el contenedor para el frontend
echo "Construyendo el contenedor para el frontend..."
docker build -t client -f Dockerfile.client .


# Crear una red de Docker para los contenedores
echo "Creando la red de Docker..."
docker network create my-network

# Ejecutar el contenedor de la base de datos
echo "Ejecutando el contenedor de la base de datos..."
docker run -d -p 3306:3306 --network=my-network --name mysql mysql

sleep 25

# Ejecutar el contenedor del backend
echo "Ejecutando el contenedor del backend..."
docker run -d -p 3000:3000 --network=my-network --name server server

# Ejecutar el contenedor del frontend
echo "Ejecutando el contenedor del frontend..."
docker run -d -p 80:80 --network=my-network --name client client

echo "¡Construcción y ejecución de contenedores completada!"