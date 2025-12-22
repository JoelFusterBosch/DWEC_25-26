import express from 'express'
import users from '../controllers/userController.js'
const app = express()
const port = 3000

const endpoint = '/api'

app.use(express.json())

app.use('/api/users', users); 

app.listen(port, () => {
    console.log(`http://localhost:${port}${endpoint}`)
})
