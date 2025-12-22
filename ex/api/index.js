import express from 'express'
import cors from 'cors'
import productes from "../routes/routes.js";
const app = express();
const port = 3000
app.use(cors());

const endpoint = '/api'

app.use(express.json())

//app.use("/api/users", userRoutes);
app.use('/api/productes', productes); 

app.listen(3000, () => {
  console.log(`Server running on http://localhost:${port}${endpoint}`);
});