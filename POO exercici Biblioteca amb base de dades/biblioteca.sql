-- Crear base de dades si no existeix
CREATE DATABASE IF NOT EXISTS Biblioteca;

-- Crear usuari (si no existeix)
CREATE USER IF NOT EXISTS 'joel'@'%' IDENTIFIED BY '1234';

-- Dona tots els privilegis sobre la base de dades Biblioteca
GRANT ALL PRIVILEGES ON Biblioteca.* TO 'joel'@'%';
FLUSH PRIVILEGES;

USE Biblioteca;

-- Taula Persona
CREATE TABLE Persona (
    id INT NOT NULL AUTO_INCREMENT,
    nom VARCHAR(255) NOT NULL DEFAULT 'Sense nom',
    dni VARCHAR(255) NOT NULL DEFAULT 'Sense dni',
    PRIMARY KEY(id)
);

INSERT INTO Persona (nom, dni) VALUES 
('Joel', '11111111A'),
('Jordi', '11111111B'),
('Carlos', '11111111C');

-- Taula Material
CREATE TABLE Material (
    id INT NOT NULL AUTO_INCREMENT,
    titol VARCHAR(255) NOT NULL DEFAULT 'Sense titol',
    NumExemplars INT NOT NULL DEFAULT 1,
    PRIMARY KEY(id)
);

INSERT INTO Material (titol, NumExemplars) VALUES 
('Harry Potter', 20),
('Titanic', 5),
('El ataque de Rusia a Ucrania', 50);

-- Taula Administrador
CREATE TABLE Administrador (
    id INT NOT NULL AUTO_INCREMENT,
    carrec ENUM('Administrador','Ajudant') NOT NULL DEFAULT 'Ajudant',
    persona_id INT NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY(persona_id) REFERENCES Persona(id)
);

INSERT INTO Administrador (carrec, persona_id) VALUES 
('Administrador', 1),
('Ajudant', 2);

-- Vista Administrador
CREATE OR REPLACE VIEW Administrador_detallat AS
SELECT 
    adm.id, 
    adm.carrec, 
    pers.nom, 
    pers.dni
FROM Administrador adm
JOIN Persona pers ON adm.persona_id = pers.id;

-- Taula Llibre
CREATE TABLE Llibre (
    id INT NOT NULL AUTO_INCREMENT,
    autor VARCHAR(255) NOT NULL DEFAULT 'Desconegut',
    material_id INT NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY(material_id) REFERENCES Material(id)
);

INSERT INTO Llibre (autor, material_id) VALUES 
('J.K Rowling', 1);

-- Vista Llibre
CREATE OR REPLACE VIEW Llibre_detallat AS
SELECT 
    ll.id, 
    ll.autor, 
    mat.titol
FROM Llibre ll
JOIN Material mat ON ll.material_id = mat.id;

-- Taula Pelicula
CREATE TABLE Pelicula (
    id INT NOT NULL AUTO_INCREMENT,
    director VARCHAR(255) NOT NULL DEFAULT 'Desconegut',
    genere VARCHAR(255) NOT NULL DEFAULT 'Desconegut',
    material_id INT NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY(material_id) REFERENCES Material(id)
);

INSERT INTO Pelicula (director, genere, material_id) VALUES 
('Steven Spielberg', 'Romanç', 2);

-- Vista Pelicula
CREATE OR REPLACE VIEW Pelicula_detallada AS
SELECT 
    pel.id, 
    pel.director, 
    pel.genere, 
    mat.titol
FROM Pelicula pel
JOIN Material mat ON pel.material_id = mat.id;

-- Taula Revista
CREATE TABLE Revista (
    id INT NOT NULL AUTO_INCREMENT,
    dataPublicacio DATE NOT NULL DEFAULT '2000-01-01',
    material_id INT NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY(material_id) REFERENCES Material(id)
);

INSERT INTO Revista (dataPublicacio, material_id) VALUES 
('2022-02-28', 3);

-- Vista Revista
CREATE OR REPLACE VIEW Revista_detallada AS
SELECT 
    rev.id, 
    rev.dataPublicacio, 
    mat.titol
FROM Revista rev
JOIN Material mat ON rev.material_id = mat.id;

-- Taula Soci
CREATE TABLE Soci (
    id INT NOT NULL AUTO_INCREMENT,
    persona_id INT,
    PRIMARY KEY(id),
    FOREIGN KEY(persona_id) REFERENCES Persona(id)
);

INSERT INTO Soci (persona_id) VALUES (3);

-- Vista Soci
CREATE OR REPLACE VIEW Soci_detallat AS
SELECT 
    soc.id, 
    pers.nom, 
    pers.dni
FROM Soci soc
JOIN Persona pers ON soc.persona_id = pers.id;

-- Taula Recurs
CREATE TABLE Recurs (
    id INT NOT NULL AUTO_INCREMENT,
    persona_id INT NOT NULL,
    material_id INT NOT NULL,
    data_prestat DATE DEFAULT NULL,
    data_retornat DATE DEFAULT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY(persona_id) REFERENCES Persona(id),
    FOREIGN KEY(material_id) REFERENCES Material(id)
);

INSERT INTO Recurs (persona_id, material_id, data_prestat, data_retornat) 
VALUES (2, 2, '2025-10-04', NULL);

-- Vista Recurs
CREATE OR REPLACE VIEW Recurs_detallat AS
SELECT 
    rec.id, 
    pers.nom AS persona, 
    mat.titol AS material,
    rec.data_prestat, 
    rec.data_retornat
FROM Recurs rec
JOIN Persona pers ON rec.persona_id = pers.id
JOIN Material mat ON rec.material_id = mat.id;

-- Triggers

DELIMITER $$

CREATE TRIGGER Recurs_prestat
BEFORE INSERT ON Recurs
FOR EACH ROW
BEGIN
    IF NEW.data_prestat IS NULL THEN
        SET NEW.data_prestat = CURDATE();
    END IF;
END$$

CREATE TRIGGER Recurs_retornat
BEFORE UPDATE ON Recurs
FOR EACH ROW
BEGIN
    IF OLD.data_retornat IS NULL AND NEW.data_retornat IS NOT NULL THEN
        SET NEW.data_retornat = CURDATE();
    END IF;
END$$

DELIMITER ;

-- Triggers de borrat

CREATE TABLE Log_Eliminacions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    taula VARCHAR(50),
    id_eliminat INT,
    data_eliminacio DATETIME
);

DELIMITER $$

CREATE TRIGGER Borrar_Persona
AFTER DELETE ON Persona
FOR EACH ROW
BEGIN
    INSERT INTO Log_Eliminacions (taula, id_eliminat, data_eliminacio)
    VALUES ('Persona', OLD.id, NOW());
END$$

CREATE TRIGGER Borrar_Material
AFTER DELETE ON Material
FOR EACH ROW
BEGIN
    INSERT INTO Log_Eliminacions (taula, id_eliminat, data_eliminacio)
    VALUES ('Material', OLD.id, NOW());
END$$

CREATE TRIGGER Borrar_Recurs
AFTER DELETE ON Recurs
FOR EACH ROW
BEGIN
    INSERT INTO Log_Eliminacions (taula, id_eliminat, data_eliminacio)
    VALUES ('Recurs', OLD.id, NOW());
END$$

DELIMITER ;
