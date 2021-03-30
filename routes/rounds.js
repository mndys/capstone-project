const express = require('express')
const Round = require('../models/Round')
const router = express.Router()

router.get('/', async (req, res, next) => {
  res.json(
    await Round.find()
      .populate({
        path: 'books.prompt',
        model: 'Prompt',
        populate: { path: 'book', model: 'Book' },
      })
      .catch(next)
  )
})

router.get('/:_id', async (req, res, next) => {
  const { _id } = req.params
  res.json(
    await Round.findById(_id)
      .populate({
        path: 'books.prompt',
        model: 'Prompt',
        populate: { path: 'book', model: 'Book' },
      })
      .catch(next)
  )
})

router.patch('/:_id/vote', async (req, res, next) => {
  const { _id } = req.params
  res.json(
    await Round.findByIdAndUpdate(
      _id,
      { $inc: { votes: 1 } },
      { new: true }
    ).catch(next)
  )
})

router.delete('/:_id', async (req, res, next) => {
  const { _id } = req.params
  res.json(await Round.findByIdAndDelete(_id).catch(next))
})

router.post('/', async (req, res, next) => {
  res.json(
    await (await Round.create(req.body).catch(next)) // nested await is needed
      .populate({
        path: 'books.prompt',
        model: 'Prompt',
        populate: { path: 'book', model: 'Book' },
      })
      .execPopulate()
      .catch(next)
  )
})

module.exports = router
