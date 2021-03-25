const mongoose = require('mongoose')

const schema = new mongoose.Schema(
  {
    option: {
      type: String,
      unique: true,
    },
    info: {
      type: String,
    },
    matchingBook: {
      type: String,
    },
  },
  { versionKey: false }
)

module.exports = mongoose.model('Backlog', schema)
