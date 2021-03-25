const mongoose = require('mongoose')

const schema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    votes: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true, versionKey: false }
)

module.exports = mongoose.model('Card', schema)
