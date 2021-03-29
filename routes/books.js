const express = require('express')
const Book = require('../models/Book')
const router = express.Router()

router.get('/', async (req, res, next) => {
  res.json(await Book.find().populate('round').populate('prompt').catch(next))
})

router.get('/:_id', async (req, res, next) => {
  const { _id } = req.params
  res.json(
    await Book.findById(_id).populate('round').populate('prompt').catch(next)
  )
})

router.patch('/:_id/vote', async (req, res, next) => {
  const { _id } = req.params
  res.json(
    await Book.findByIdAndUpdate(
      _id,
      { $inc: { votes: 1 } },
      { new: true }
    ).catch(next)
  )
})

router.delete('/:_id', async (req, res, next) => {
  const { _id } = req.params
  res.json(await Book.findByIdAndDelete(_id).catch(next))
})

router.post('/', async (req, res, next) => {
  res.json(
    await (await Book.create(req.body).catch(next)) // nested await is needed
      .populate('round')
      .populate('prompt')
      .execPopulate()
      .catch(next)
  )
})

module.exports = router
