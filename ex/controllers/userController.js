// controllers/user.controller.js
import {
  findUserDB,
  getAllUsersDB,
  createUserDB
} from "../models/User.js";

export const loginUser = async (req, res) => {
  const { username, password } = req.body;

  const user = await findUserDB(username, password);

  if (!user) {
    return res.status(401).json({ error: "Credenciales incorrectas" });
  }

  res.json({ success: true });
};

export const getAllUsers = async (req, res) => {
  const users = await getAllUsersDB();
  res.json(users);
};

export const createUser = async (req, res) => {
  const { username, password } = req.body;
  await createUserDB(username, password);
  res.json({ success: true });
};
