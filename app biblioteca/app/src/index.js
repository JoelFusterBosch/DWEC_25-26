const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());

app.use(cors());
app.use(express.json());

const recursos = require('../routes/recursos');
const persones = require('../routes/persones');
app.use('/recursos', recursos);  
app.use('/persones', persones);  

app.use(express.static(path.join(__dirname, '../public')));


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/html/index.html'));
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Servidor escoltant en http://0.0.0.0:${port}`);
});
