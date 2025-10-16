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
        console.error(err);
        res.status(500).json({ error: "Error a l'hora de llistar els recursos" });
    }
});


router.get('/llibres', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM Llibre');
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error a l'hora de llistar els llibres" });
    }
});


router.get('/revistes', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM Revista');
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error a l'hora de llistar les revistes" });
    }
});


router.get('/pelicules', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM Pelicula');
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error a l'hora de llistar les pelicules" });
    }
});


router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await pool.query('SELECT * FROM Recurs WHERE id = ?', [id]);
        if (rows.length === 0) return res.status(404).json({ error: "Recurs no trobat" });
        res.json(rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error a l'hora de llistar els recursos" });
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
        res.json(rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error a l'hora d'afegir el llibre" });
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
        res.json(rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error a l'hora d'afegir la revista" });
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
        res.json(rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error a l'hora d'afegir la pelicula" });
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
        res.json(rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
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
        res.json(rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

router.put('/updPelicula/:id', async (req, res) => {
    const { id } = req.params;
    const { director, genere, material_id } = req.body;

    try {
        await pool.query(
            'UPDATE Pelicula SET director = ?, genere = ?, material_id = ? WHERE id = ?',
            [director, genere, material_id, id]
        );
        const [rows] = await pool.query('SELECT * FROM Pelicula WHERE id = ?', [id]);
        if (rows.length === 0) return res.status(404).json({ error: "Pelicula no trobada" });
        res.json(rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
