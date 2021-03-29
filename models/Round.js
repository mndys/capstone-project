const mongoose = require('mongoose')

const schema = new mongoose.Schema(
  {
    month: {
      type: Date,
      unique: true,
    },
    books: [
      {
        book: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Book',
        },
        prompt: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Prompt',
        },
      },
    ],
  },
  { versionKey: false }
)

module.exports = mongoose.model('Round', schema)
