const express = require('express');
const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());

const recursos = require('./routes/recursos');
const persones = require('./routes/persones');
app.use('/recursos', recursos);  
app.use('/persones', persones);  

app.get('/', (req, res) => {
  res.json({ missatge: 'Hola des de Node.js' });
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Servidor escoltant en http://0.0.0.0:${port}`);
});
