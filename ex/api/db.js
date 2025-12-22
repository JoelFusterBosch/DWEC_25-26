import mysql from 'mysql2/promise';
/*
import { Sequelize } from 'sequelize';

const db = new Sequelize('tienda', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});

export default db;
*/
//sequelize


const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'products',
    password: 'root'
});

export default connection