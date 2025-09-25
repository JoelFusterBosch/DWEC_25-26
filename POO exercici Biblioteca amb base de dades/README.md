# POO exercici Biblioteca amb base de dades
Fitxers de DockerFile i docker-compose amb el contenedor de mysql + servidor en sqlite `És el que vaig fer al principi` :upside_down_face: 

## Com crear el contenedor de Docker amb Dockerfile i docker-compose.yml

Primer hem de crear els fitxers `Dockerfile` i `docker-compose.yml` i hem de posarel següent contingut en els fitxers

Dockerfile
```bash
# Dockerfile
FROM mysql:8.0

# Variables d'entorn 
ENV MYSQL_DATABASE=bibilioteca \
    MYSQL_USER=joel \
    MYSQL_PASSWORD=1234 \
    MYSQL_ROOT_PASSWORD=1234

#Usuari per defecte del contenidor
USER mysql

#Permetre la exposició de dades amb el port 3306
EXPOSE 3306
```
docker-compose.yml
```bash
services:
  db:
    build: .   # Usa el Dockerfile en este directorio
    container_name: dwec_mysql
    restart: always
    environment:
      MYSQL_ROOT_PASSWORD: 1234
      MYSQL_DATABASE: biblioteca
      MYSQL_USER: joel
      MYSQL_PASSWORD: 1234
    ports:
      - "3306:3306"
    volumes:
      - db_data:/var/lib/mysql
      - ./init.sql:/docker-entrypoint-initdb.d/init.sql  # Opcional: script inicial

volumes:
  db_data:

```
I per últim en el terminal executarem el següent comand:
```bash
docker compose up -d --build
```
## Com copiar fitxers al contenedor de Docker
Per a copiar un fitxer al contenidor de Docker necessitarem executar este comand:
`docker cp Rutabsoluta/relativaDesDelProjecte/nomDelFitxer.sql NomContenidor:/nomDelFitxer.sql`
Quedant de la següent forma:
```bash
docker cp /DWEC_25-26/POO exercici Biblioteca amb base de dades/biblioteca.sql" dwec_mysql:/biblioteca.sql
```
## Com executar el fitxer .sql i vore les taules
Primer entrem a la base de dades amb root
```bash
docker exec -it dwec_mysql mysql -u root -p
```
Després executem la base de dades amb el següent comand:
```bash
SOURCE /biblioteca.sql;
```
I per a vore les taules has d'usar la base de dades `Biblioteca` i mostres les taules amb els següents comands:
```bash
USE Biblioteca;
SHOW TABLES;
```
Quan els executeu voreu el següent:
<img src="./Captura de pantalla 2025-09-24 180158.png">