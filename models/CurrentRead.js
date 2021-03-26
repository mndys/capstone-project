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
    onTbr: {
      type: String,
    },
  },
  { versionKey: false }
)

module.exports = mongoose.model('CurrentRead', schema)
