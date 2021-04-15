const mongoose = require('mongoose')

const schema = new mongoose.Schema(
  {
    month: {
      type: Date,
      unique: true,
    },
    books: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book',
      },
    ],
  },
  { versionKey: false }
)

module.exports = mongoose.model('Round', schema)
