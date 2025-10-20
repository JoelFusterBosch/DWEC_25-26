const express = require('express');
const router = express.Router();
const pool = require('../db');

/*
   GETS
*/

router.get('/', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM Recurs');
        res.json(rows);
    } catch (err) {
        console.log("Error al obtindre el recursos", err);
        return next(err);
    }
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await pool.query('SELECT * FROM Recurs WHERE id = ?', [id]);
        if (rows.length === 0) return res.status(404).json({ error: "Recurs no trobat" });
        res.status(200).json(rows[0]);
    } catch (err) {
        console.log("Error al obtindre el recurs", err);
        return next(err);
    }
});

router.get('/llibres', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM Llibre');
        res.json(rows);
    } catch (err) {
        console.log("Error al llistar els llibres", err);
        return next(err);e
    }
});


router.get('/revistes', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM Revista');
        res.json(rows);
    } catch (err) {
        console.log("Error al obtindre les revistes", err);
        return next(err);
    }
});


router.get('/pelicules', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM Pelicula');
        res.json(rows);
    } catch (err) {
        console.log("Error al obtindre les pel·licules", err);
        return next(err);
    }
});


/*
   POSTS
*/


router.post('/addLlibre', async (req, res) => {
    const { autor, material_id } = req.body;
    try {
        const [result] = await pool.query(
            'INSERT INTO Llibre (autor, material_id) VALUES (?, ?)',
            [autor, material_id]
        );
        const [rows] = await pool.query('SELECT * FROM Llibre WHERE id = ?', [result.insertId]);
        res.status(201).json(rows[0]);
    } catch (err) {
        console.log("Error al afegir el llibre", err);
        return next(err);
    }
});


router.post('/addRevista', async (req, res) => {
    const { dataPublicacio, material_id } = req.body;
    try {
        const [result] = await pool.query(
            'INSERT INTO Revista (dataPublicacio, material_id) VALUES (?, ?)',
            [dataPublicacio, material_id]
        );
        const [rows] = await pool.query('SELECT * FROM Revista WHERE id = ?', [result.insertId]);
        res.status(201).json(rows[0]);
    } catch (err) {
        console.log("Error al afegir la revista", err);
        return next(err);
    }
});


router.post('/addPelicula', async (req, res) => {
    const { director, genere, material_id } = req.body;
    try {
        const [result] = await pool.query(
            'INSERT INTO Pelicula (director, genere, material_id) VALUES (?, ?, ?)',
            [director, genere, material_id]
        );
        const [rows] = await pool.query('SELECT * FROM Pelicula WHERE id = ?', [result.insertId]);
        res.status(201).json(rows[0]);
    } catch (err) {
        console.log("Error al afegir la pel·licula", err);
        return next(err);
    }
});

/*
   PUTS
*/

router.put('/updLlibre/:id', async (req, res) => {
    const { id } = req.params;
    const { autor, material_id } = req.body;

    try {
        await pool.query(
            'UPDATE Llibre SET autor = ?, material_id = ? WHERE id = ?',
            [autor, material_id, id]
        );
        const [rows] = await pool.query('SELECT * FROM Llibre WHERE id = ?', [id]);
        if (rows.length === 0) return res.status(404).json({ error: "Llibre no trobat" });
        res.status(200).json(rows[0]);
    } catch (err) {
        console.log("Error al actualitzar el llibre", err);
        return next(err);
    }
});

router.put('/updRevista/:id', async (req, res) => {
    const { id } = req.params;
    const { dataPublicacio, material_id } = req.body;

    try {
        await pool.query(
            'UPDATE Revista SET dataPublicacio = ?, material_id = ? WHERE id = ?',
            [dataPublicacio, material_id, id]
        );
        const [rows] = await pool.query('SELECT * FROM Revista WHERE id = ?', [id]);
        if (rows.length === 0) return res.status(404).json({ error: "Revista no trobada" });
        res.status(200).json(rows[0]);
    } catch (err) {
        console.log("Error al actualitzar la revista", err);
        return next(err);
    }
});

router.put('/updPelicula/:id', async (req, res, next) => {
    const { id } = req.params;
    const { director, genere, material_id } = req.body;

    try {
        await pool.query(
            'UPDATE Pelicula SET director = ?, genere = ?, material_id = ? WHERE id = ?',
            [director, genere, material_id, id]
        );
        const [rows] = await pool.query('SELECT * FROM Pelicula WHERE id = ?', [id]);
        if (rows.length === 0) return res.status(404).json({ error: "Pelicula no trobada" });
        res.status(200).json(rows[0]);
    } catch (err) {
        console.log("Error al actualitzar la pel·licula", err);
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
