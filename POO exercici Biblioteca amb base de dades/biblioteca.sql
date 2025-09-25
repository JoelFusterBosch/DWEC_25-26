-- Crear base de dades i usuari
-- Crear base de dades si no existeix
CREATE DATABASE IF NOT EXISTS Biblioteca;

-- Crear usuari (si no existeix)
CREATE USER IF NOT EXISTS 'joel'@'%' IDENTIFIED BY '1234';

-- Dona tots els privilegis sobre la base de dades Biblioteca
GRANT ALL PRIVILEGES ON Biblioteca.* TO 'joel'@'%';

-- Aplicar els canvis
FLUSH PRIVILEGES;


USE Biblioteca;

-- Taula Persona
CREATE TABLE Persona (
    id INT NOT NULL AUTO_INCREMENT,
    nom VARCHAR(255) NOT NULL DEFAULT 'Sense nom',
    dnl VARCHAR(255) NOT NULL DEFAULT 'Sense dnl',
    PRIMARY KEY(id)
);

-- Taula Material
CREATE TABLE Material (
    id INT NOT NULL AUTO_INCREMENT,
    titol VARCHAR(255) NOT NULL DEFAULT 'Sense titol',
    NumExemplars INT NOT NULL DEFAULT 1,
    PRIMARY KEY(id)
);

-- Taula Administrador
CREATE TABLE Administrador (
    id INT NOT NULL AUTO_INCREMENT,
    carrec ENUM('Administrador','Ajudant') NOT NULL DEFAULT 'Ajudant',
    persona_id INT NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY(persona_id) REFERENCES Persona(id)
);

-- Taula Llibre
CREATE TABLE Llibre (
    id INT NOT NULL AUTO_INCREMENT,
    autor VARCHAR(255) NOT NULL DEFAULT 'Desconegut',
    material_id INT NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY(material_id) REFERENCES Material(id)
);

-- Taula Pelicula
CREATE TABLE Pelicula (
    id INT NOT NULL AUTO_INCREMENT,
    director VARCHAR(255) NOT NULL DEFAULT 'Desconegut',
    genere VARCHAR(255) NOT NULL DEFAULT 'Desconegut',
    material_id INT NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY(material_id) REFERENCES Material(id)
);

-- Taula Revista
CREATE TABLE Revista (
    id INT NOT NULL AUTO_INCREMENT,
    dataPublicacio DATE NOT NULL DEFAULT '2000-01-01',
    material_id INT NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY(material_id) REFERENCES Material(id)
);

-- Taula Soci
CREATE TABLE Soci (
    id INT NOT NULL AUTO_INCREMENT,
    llistaLlibres TEXT NOT NULL,
    persona_id INT,
    PRIMARY KEY(id),
    FOREIGN KEY(persona_id) REFERENCES Persona(id)
);
