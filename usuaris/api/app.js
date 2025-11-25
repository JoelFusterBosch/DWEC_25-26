const express = require('express');
const cors = require('cors');


const app = express();
const port = 3001;

app.use(express.json());

app.use(cors());
app.use(express.json());

const api = require('../routes/users');
app.use('/api', api);    

app.get('/', (req, res) => {
  res.send("Hola");
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Servidor escoltant en http://0.0.0.0:${port}`);
});
