const mongoose = require('mongoose')

require('dotenv').config()
const { MONGODB_URL } = process.env

module.exports = function setupMongo() {
  mongoose
    .connect(MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log('Connected to mongodb'))
    .catch(error => console.error('Could not connect to mongodb', error))
}
