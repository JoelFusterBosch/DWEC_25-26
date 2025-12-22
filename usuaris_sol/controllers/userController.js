import express from 'express'
import bcrypt from 'bcrypt'
import connection from '../api/db.js'
import jwt from "jsonwebtoken";
import cookieParser from 'cookie-parser';

const secretKey = "secret";
const router = express.Router();

router.use(express.json())
router.use(cookieParser())

function requireAdmin(req, res, next) {
  if (!req.user) {
    return res.status(401).json({ message: "No autenticat" });
  }

  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "No tens permisos" });
  }

  next();
}

router.get("/", verifyToken, requireAdmin, async (req, res) => {
  try {
    const [results] = await connection.query(
      'SELECT name, role FROM users'
    );
    res.status(200).json(results);
  } catch (err) {
    errorHandler(err);
  }
});


router.post("/", async (req, res) => {
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

router.post("/login", async (req, res) => {
  try {
    const { name, password } = req.body;

    const [results] = await connection.query(
      "SELECT * FROM users WHERE name = ?",
      [name]
    );

    if (results.length === 0) {
      return res.status(401).json({ message: "Usuari no trobat" });
    }

    const user = results[0];
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Contrasenya incorrecta" });
    }

    const token = jwt.sign(
      { id: user.id, name: user.name, role: user.role },
      secretKey,
      { expiresIn: "5m" }
    );

    res.cookie("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 5 * 60 * 1000
    });

    return res.status(200).json({ message: "Login correcte" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error intern del servidor" });
  }
});

router.get("/create",(req,res)=>{
    res.cookie("name","Prova Correcta", {maxAge:86400, httpOnly: true});
   return res.send('Cookie creada correctament');
  });
router.get('mostrar-cookie', (req, res) => {
  const name=req.cookies.name;
   if(name){
       return res.send(name)
   }
   else{
    return res.send("no tens cookies!");
   }
});

function verifyToken(req, res, next) {
  const token = req.cookies.auth_token;

  if (!token) {
    return res.status(401).json({ message: "Token no proporcionat" });
  }

  try {
    const payload = jwt.verify(token, secretKey);
    req.user = payload;
    next();
  } catch (error) {
    return res.status(403).json({ message: "Token no vàlid o expirat" });
  }
}
const errorHandler = (err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send(`Error al servidor:\n ${err}`)
}

export default router;