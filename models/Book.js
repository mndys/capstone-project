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
    publishedDate: {
      type: Date,
    },
    description: {
      type: String,
    },
    cover: {
      type: String,
      default: 'https://source.unsplash.com/HH4WBGNyltc/500x700',
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
    genre: {
      type: String,
    },
    subject: {
      type: String,
    },
    round: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Round',
    },
    prompt: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Prompt',
    },
  },
  { versionKey: false }
)

module.exports = mongoose.model('Book', schema)
