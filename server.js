const express = require('express')
const setupMongo = require('./setupMongo')
require('dotenv').config()
const { PORT = 4000 } = process.env

setupMongo()
const app = express()

app.use('/', express.json()) // add middleware for json data
app.get('/', (req, res) => {
  res.json({ message: 'Hello from server!' })
})
app.use(express.static('./client/build'))
app.use('/api/tbr', require('./routes/tbr'))
app.use('/api/prompts', require('./routes/prompts'))
app.use('/api/current-reads', require('./routes/current-reads'))
app.use(require('./routes/error'))

app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`)
})
