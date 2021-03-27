const mongoose = require('mongoose')

const schema = new mongoose.Schema(
  {
    title: {
      type: String,
      unique: true,
    },
    author: {
      type: String,
    },
    cover: {
      type: String,
    },
    pageCount: {
      type: Number,
    },
    rating: {
      type: Number,
    },
    isbn: {
      type: String,
    },
    published: {
      type: Date,
    },
    genre: {
      type: String,
    },
    subject: {
      type: String,
    },
    round: {
      type: mongoose.Schema.Type.ObjectID,
      ref: 'Round',
    },
    prompt: {
      type: mongoose.Schema.Type.ObjectID,
      ref: 'Prompt',
    },
  },
  { versionKey: false }
)

module.exports = mongoose.model('Book', schema)
