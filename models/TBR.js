const mongoose = require('mongoose')

const schema = new mongoose.Schema(
  {
    title: {
      type: String,
      unique: true,
    },
    author: {
      type: String,
      default: () => `hsl(${Math.round(Math.random() * 360)}, 70%, 60%)`,
    },
    cover: {
      type: String,
    },
    pageCount: {
      type: Number,
    },
    rating: {
      type: String,
    },
    rating: {
      type: String,
    },
    onTbr: {
      type: String,
    },
  },
  { versionKey: false }
)

module.exports = mongoose.model('Tbr', schema)
