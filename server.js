const express = require('express')
const setupMongo = require('./setupMongo')
require('dotenv').config()
var cors = require('cors')
const path = require('path')

const { PORT = 4000 } = process.env

setupMongo()
const app = express()

app.use(cors())
app.use('/', express.json()) // add middleware for json data
app.use(express.static('./client/build'))
app.use('/api/books', require('./routes/books'))
app.use('/api/prompts', require('./routes/prompts'))
app.use('/api/rounds', require('./routes/rounds'))
app.use(require('./routes/error'))
app.use('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/client/build/index.html'))
)

app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`)
})
