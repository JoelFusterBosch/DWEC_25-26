# APIS en Node.js
## Instal·lació i creació d'un projecte de Node.js
### Instal·lació en local
Per a instal·lar Node.js en local en `Linux` és tan fàcil com fer 
```bash
# En sistemes com Ubuntu o Linux Mint
sudo apt install nodejs
```
i també es pot anar a la pàgna oficial de Node a través d'[este enllaç](https://nodejs.org/es/download) per a descarregar el instal·lador tant en Linux com en els altres sistemes operatius com `Windows` o `Mac`.
### Instal·lació en Docker
Per a instal·lar Node en Docker podeu basar-se en el següent apartat de la pàgina oficial de Nodejs:

```bash
# Docker provee instrucciones dedicadas para cada sistema operativo.
# Por favor consulta la documentación oficial en https://www.docker.com/get-started/

# Descarga la imagen de Docker de Node.js:
docker pull node:22-alpine

# Crea un contenedor de Node.js e inicia una sesión shell:
docker run -it --rm --entrypoint sh node:22-alpine

# Verify the Node.js version:
node -v # Should print "v22.20.0".

# Verifica versión de npm:
npm -v # Debería mostrar "10.9.3".
```
### Creació i configuració d'un projecte de Node.js
Per a crear un projecte en Node.js clarament necessitem tindre Node.js iinstal·lat i executar aquest comand:
```bash
npm init
```
Ara amb el projecte creat necessitem instal·lar unes quantes llibreries per a poder tant connectar-mo'n a la base de dades com per a poder fer APIs, instal·larem les següents llibreries que tenen les següents funcions:
- Express: Aquesta llibreria ens permet crear la creació i utilització de les APIs.
- mysql2: Permet l'utilització de sentencies de MySQL.
- dotenv: Permet llegir els fitxers .env que n'hi hagen en el projecte Node.
- router:

I totes aquestes llibreries podem instal·lar-les de la següent forma:
```bash
npm install express
npm install mysql2
npm install dotenv
npm install router
...
```
Ara que ja tenim les llibreries anem a fer el projecte en general, seguirem la següent estructura:
```bash
Carpeta arrel del projecte/
├── node_modules/
│   └── No entrem en detall
├── routes/ (importan fer la carpeta si vols tindre els endpoints en 1 lloc)
│   └── "Nom del endpoint".js (pots fer 1 o més endpoints, pots fer els que vullgues)
├── package-lock.json
├── package.json
├── .env
├── db.js (pots posar-lo en una carpeta també, dona igual)
└── "main".js (o com siga el fitxer principal creat amb npm init) 
```
#### Contingut dels fitxers
Ara ambels fitxers creat vos dire que heu de posar en ells:
- .env

Ací hem de posar les dades de la base de dades, i opcionalment el port del servidor.
```.env
# MySQL
DB_USER=Nom del usuari
DB_HOST=localhost (en la majoria de casos, si no posa la ip de la màquina)
DB_DATABASE=Nom de la Base de dades
DB_PASSWORD=Contrasenya de root
DB_PORT=3306 (Per defecte el port de la base de dades MySQL es 3306, però pots posar el que vullgues)

# Port del servidor
PORT=3000 (El mateix que en el de MySQL, però que siga diferent)
```
- db.js

En aquest fitxer és posen les dades de la base de dades, però com ja les tenim en el fitxer `.env` les importem allí:
```javascript
require('dotenv').config();
const mysql = require('mysql2');

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: parseInt(process.env.DB_PORT, 10) || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Exportamos la versión que soporta Promesas
module.exports = pool.promise();
```
- "Nom del endpoint".js (o el endpoint que necessites)
Ací sera on farem els endpoints de les nostres taules en SQL, este apartat és dividira en 4 parts, però en el exercici són 3 perquè és important que saber totes les instancies dels endpoints en una API:
  - GET
  
Utilitzem GET per a ontindre informació del servidor, comunment per a obtindre les dades de la base de dades.
En Node seria fer el següent:
```javascript
router.get('/', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM "taula"');
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error a l'hora de llistar els recursos de la taula" });
    }
});
```
o també podria ser així si vols agafar algo en específic com en este cas el `id`:
```javascript
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await pool.query('SELECT * FROM taula WHERE id = ?', [id]);
        if (rows.length === 0) return res.status(404).json({ error: "Recurs de la taula no trobat" });
        res.json(rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error a l'hora de llistar els recursos de la tauña" });
    }
});
```

  - POST

Utilitzem POST per a enviar la informació al servidor, comunment per a enviar dades a la base de dades.
En Node seria fer el següent:
```javascript
router.post('/addTaula', async (req, res) => {
    const {atr1, atr2} = req.body;
    try {
        const [rows] = await pool.query('INSERT INTO "taula" VALUES(atr1, atr2) (?,?)',[atr1, atr2]);
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error a l'hora d'afegir els recursos de la taula" });
    }
});
```
  - UPDATE

Utilitzem UPDATE per a actualitzar la informació del servidor, comunment per a actualitzar les dades de la base de dades.
En Node seria fer el següent:
```javascript
router.update('/update/:id', async (req, res) => {
    const { id } = req.params;
    const { atr1, atr2 } = req.body;
    try {
        const [rows] = await pool.query('UPDATE "taula" SET atr1 = ?, atr2 = ? WHERE id = ?',[atr1, atr2, id]);
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error a l'hora d'actualitzar els recursos de la taula" });
    }
});
```
  - DELETE
Utilitzem DELETE per a eliminar la informació del servidor, comunment per a eliminar les dades de la base de dades.
En Node seria fer el següent:
```javascript
router.delete('/borrar/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM atr WHERE id = ?', [id]);
    res.json({ missatge: 'Faller borrat' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error a l'hora de borrar els recursos de la taula" });
  }
});
```

---
Amb això ja explicat el programa deuria de quedar de la següent forma:
```javascript
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

module.exports = router;

```
- index.js (o com siga el fitxer principal creat amb npm init)

En el ftxer principal hem de crear la connexió al endpoint principal, i on el servidor tindra accés als altres endpoints que teniem en la carpteta routes, que deuria de quedar de la següent forma:
```javascript
// Importem les llibreries de express i les usem
const express = require('express');
const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());

// Importació i ús dels endpoints
const recursos = require('./routes/recursos');
const persones = require('./routes/persones');
app.use('/recursos', recursos);  
app.use('/persones', persones);  

//Endopint principal amb una salutació
app.get('/', (req, res) => {
  res.json({ missatge: 'Hola des de Node.js' });
});

//En el terminal apareixera el següent quan iniciem el servidor
app.listen(port, '0.0.0.0', () => {
  console.log(`Servidor escoltant en http://0.0.0.0:${port}`);
});

```
