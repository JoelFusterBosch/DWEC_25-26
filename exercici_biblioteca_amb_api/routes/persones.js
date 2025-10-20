const express = require('express');
const router = express.Router();
const pool = require('../db');

/*
   GETS
*/

router.get('/', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM Persona');
        res.status(200).json(rows);
    } catch (err) {
        console.log("Error al obtindre les perrsones", err);
        return next(err);
    }
});
router.get('/soci/:id', async (req,res)=>{
    const { id } = req.params;
        try {
            const [rows] = await pool.query('SELECT * FROM Soci WHERE id = ?', [id]);
            if (rows.length === 0) return res.status(404).json({ error: "Soci no trobat" });
            res.status(200).json(rows[0]);
        } catch (err) {
            console.log("Error al obtindre el soci", err);
            return next(err);
        }
});
router.get('/administrador/:id', async (req,res)=>{
    const { id } = req.params;
        try {
            const [rows] = await pool.query('SELECT * FROM Administrador WHERE id = ?', [id]);
            if (rows.length === 0) return res.status(404).json({ error: "Administrador no trobat" });
            res.status(200).json(rows[0]);
        } catch (err) {
            console.log("Error al obtindre al administrador", err);
            return next(err);
        }
});

/*
POSTS
*/

router.post('/addSoci', async (req, res) => {
    const { persona_id } = req.body;
    try {
        const [result] = await pool.query(
            'INSERT INTO Soci (persona_id) VALUES (?)',
            [persona_id]
        );
        const [rows] = await pool.query('SELECT * FROM Soci WHERE id = ?', [result.insertId]);
        res.json(rows[0]);
    } catch (err) {
        console.log("Error al afegir al administrador", err);
        return next(err);
    }
});
router.post('/addAdministrador', async (req, res) => {
    const { carrec, persona_id } = req.body;
    try {
        const [result] = await pool.query(
            'INSERT INTO Administrador (carrec,persona_id) VALUES (?,?)',
            [carrec,persona_id]
        );
        const [rows] = await pool.query('SELECT * FROM Administrador WHERE id = ?', [result.insertId]);
        res.json(rows[0]);
    } catch (err) {
        console.log("Error al afegir al administrador", err);
        return next(err);
    }
});
/*
PUTS
*/
router.put('/updSoci/:id', async (req, res) => {
    const { id } = req.params;
    const { persona_id } = req.body;

    try {
        await pool.query(
            'UPDATE Soci SET persona_id = ? WHERE id = ?',
            [persona_id, id]
        );
        const [rows] = await pool.query('SELECT * FROM Soci WHERE id = ?', [id]);
        if (rows.length === 0) return res.status(404).json({ error: "Soci no trobat" });
        res.json(rows[0]);
    } catch (err) {
        console.log("Error al actualitzar el soci", err);
        return next(err);
    }
});
router.put('/updAdministrador/:id', async (req, res) => {
    const { id } = req.params;
    const { carrec,persona_id } = req.body;

    try {
        await pool.query(
            'UPDATE Administrador SET carrec = ?, persona_id = ? WHERE id = ?',
            [carrec,persona_id, id]
        );
        const [rows] = await pool.query('SELECT * FROM Administrador WHERE id = ?', [id]);
        if (rows.length === 0) return res.status(404).json({ error: "Administrador no trobat" });
        res.json(rows[0]);
    } catch (err) {
        console.log("Error al actualitzar l'administrador", err);
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
module.exports = router;
module.exports = router;