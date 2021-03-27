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
    book: {
      type: mongoose.Schema.Type.ObjectID,
      ref: 'Book',
    },
  },
  { versionKey: false }
)

module.exports = mongoose.model('Prompt', schema)
