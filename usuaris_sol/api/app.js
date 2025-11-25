import express from 'express'
import bcrypt from 'bcrypt'
import connection from './db.js'
import jwt from "jsonwebtoken";


const app = express()
const port = 3000
const secretKey = "secret";
const endpoint = '/api/users'

app.use(express.json())

const requireAdmin = async (req, res, next) => {
    try {
        const { name, password } = req.body
        const [results] = await connection.query(
            'SELECT role, password FROM users WHERE name = ?',
            [name]
        )
        const passwordMatched = await bcrypt.compare(password, results[0].password);
        if (results.length === 0) {
            res.status(401).send('Usuari no autoritzat')
        } else {
            if (results[0].role === 'admin' && passwordMatched) {
                next()
            } else {
                res.status(403).send('No tens permissos')
            }
        }
    } catch (err) {
        errorHandler(err)
    }
}

app.get(endpoint, requireAdmin, async (req, res) => {
    try {
        const [results] = await connection.query(
            'SELECT name, role FROM users'
        );
        res.status(200).json(results)
    } catch (err) {
        errorHandler(err)
    }
})

app.post(endpoint, async (req, res) => {
    try {
        let { name, password, role = 'user' } = req.body
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
        const [results] = await connection.query(
            'INSERT INTO users(name, password, role) VALUES(?, ?, ?)',
            [name, hashedPassword, role]
        );
        res.status(200).json(results)
    } catch (err) {
        errorHandler(err)
    }
})

app.post("/api/users/login", (req, res) => {
  try {
    const name = req.body.name;
    const password = req.body.password;
    if (!name || !password) {
      return res.status(400).json({ message: "Es requereix nom d'usuari i contrasenya" });
    }
    if (name === "Joel" && password === "1234") {
      const token = jwt.sign({ name: name }, secretKey, { expiresIn: "1h" });
      return res.status(200).json({ token });
    } else {
      return res.status(401).json({ message: "Ha fallat l'autentcació" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
});
app.get("/protected", verifyToken, (req, res) => {
  return res.status(200).json({ message: "Tens accés!" });
});

function verifyToken(req, res, next) {
  const header = req.header("Autorització") || "";
  const token = header.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Token not provied" });
  }
  try {
    const payload = jwt.verify(token, secretKey);
    req.username = payload.username;
    next();
  } catch (error) {
    return res.status(403).json({ message: "Token no valid!" });
  }
}

const errorHandler = (err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send(`Error al servidor:\n ${err}`)
}

app.listen(port, () => {
    console.log(`http://localhost:${port}${endpoint}`)
})
