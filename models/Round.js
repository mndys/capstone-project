const mongoose = require('mongoose')

const schema = new mongoose.Schema(
  {
    month: {
      type: Date,
      unique: true,
    },
    books: [
      {
        type: mongoose.Schema.Type.ObjectID,
        ref: 'Prompt',
      },
    ],
  },
  { versionKey: false }
)

module.exports = mongoose.model('Round', schema)
