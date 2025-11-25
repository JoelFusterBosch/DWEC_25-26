const express = require('express');
const router = express.Router();
const pool = require('../api/db');

const requireAdmin = (req, res, next)=>{
    console.log("Middleware d'autenticació");
    if(req.body){
        if(req.body.name){
            console.log("Nom existeix");
            if(req.body.password){
                console.log("Contrasenya existeix");
                if(req.body.role){
                    const {role} = req.body;
                    if(role === 'admin'){
                        next();
                        return;
                    }else{
                       res.status(401).json({error: "Accés denegat"}); 
                    }
                }else{
                    res.status(403).json({error: "Error degut a falta del rol"}); 
                }
            }else{
                res.status(403).json({error: "Error degut a falta de contrasenya"}); 
            }
        }else{
            res.status(403).json({error: "Error degut a falta del nom del usuari"}); 
        }
    }
    res.redirect('/');
}
module.exports = router;

router.get('/users', requireAdmin ,async(req, res, next) => {
    try {
        const [rows] = await pool.query('SELECT name, role FROM users');
        res.status(200).json(rows);
    } catch (err) {
        console.log("Error al obtindre els usuaris", err);
        return next(err);
    }
});
router.post('/users', async (req,res, next) => {
    const {name, password, role} = req.body;
    try{
        if(role === null){
            role = 'user';
        }
        const [result] = await pool.query(
          'INSERT INTO users (name,password,role) VALUES(?,?,?)',
          [name,password,role]  
        );
        const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [result.insertId]);
        res.json(rows[0]);
    }catch (err) {
        console.log("Error al afegir al usuari", err);
        return next(err);
    }
});
router.use((err, req, res, next)=>{
    console.log(err);
    res.status(500).json({
        ok:false,
        error:"Error intern en el servidor",
        detail: process.env.NODE_ENV === 'production' ? undefined : err.message
    });
});
