const express = require('express')
const setupMongo = require('./setupMongo')

const { PORT = 4000 } = process.env

setupMongo()
const app = express()

app.use('/', express.json()) // add middleware for json data
app.use(express.static('./client/build'))
app.use('/api/books', require('./routes/books'))
app.use('/api/prompts', require('./routes/prompts'))
app.use('/api/rounds', require('./routes/rounds'))
app.use(require('./routes/error'))

app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`)
})
