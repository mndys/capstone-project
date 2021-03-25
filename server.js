const express = require('express')
const setupMongo = require('./setupMongo')
require('dotenv').config()
const { PORT = 4000 } = process.env

setupMongo()
const app = express()

app.use('/', express.json()) // add middleware for json data
app.use(express.static('./client/build'))
app.use('/api/tbr', require('./routes/tbr'))
app.use('/api/prompts', require('./routes/prompts'))
app.use('/api/current-reads', require('./routes/current-reads'))
app.use(require('./routes/error'))

app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`)
})

const express = require('express')

const PORT = process.env.PORT || 4000

const app = express()

app.get('/api', (req, res) => {
  res.json({ message: 'Hello from server!' })
})

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`)
})
