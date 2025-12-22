// models/user.model.js
import connection from "../api/db.js";

export const findUserDB = async (username, password) => {
  const [rows] = await connection.query(
    "SELECT * FROM users WHERE username = ? AND password = ?",
    [username, password]
  );
  return rows[0];
};

export const getAllUsersDB = async () => {
  const [rows] = await connection.query("SELECT * FROM users");
  return rows;
};

export const createUserDB = async (username, password) => {
  const [result] = await connection.query(
    "INSERT INTO users (username, password) VALUES (?, ?)",
    [username, password]
  );
  return result.insertId;
};
