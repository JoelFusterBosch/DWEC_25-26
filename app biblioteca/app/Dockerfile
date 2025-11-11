FROM node:18-alpine

# Crear directorio de trabajo
WORKDIR /usr/src/app

# Copiar los archivos de definición de dependencias
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del código
COPY . .

# Exponer el puerto que usa la app
EXPOSE 3000

# Comando para iniciar la app
CMD ["npm", "start"]
