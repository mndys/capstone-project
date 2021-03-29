const mongoose = require('mongoose')

const schema = new mongoose.Schema(
  {
    month: {
      type: Date,
      unique: true,
    },
    books: {
      type: Map,
      of: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Prompt',
      },
    },
  },
  { versionKey: false }
)

module.exports = mongoose.model('Round', schema)
