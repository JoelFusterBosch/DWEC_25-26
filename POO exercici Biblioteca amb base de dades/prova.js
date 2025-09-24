import sqlite3 from "sqlite3";
import { open } from "sqlite";

const db = await open({
  filename: ".\\DWEC_25-26\\POO exercici Biblioteca amb base de dades\\Biblioteca.db",
  driver: sqlite3.Database
});

const users = await db.all("SELECT * FROM Administrador");
console.log(users);

