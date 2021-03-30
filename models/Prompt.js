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
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Book',
    },
  },
  { versionKey: false }
)

module.exports = mongoose.model('Prompt', schema)
