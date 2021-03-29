const express = require('express')
const Round = require('../models/Round')
const router = express.Router()

router.get('/', async (req, res, next) => {
  res.json(await Round.find().populate('books.prompt').catch(next))
})

router.get('/:_id', async (req, res, next) => {
  const { _id } = req.params
  res.json(await Round.findById(_id).populate('books.$*').catch(next))
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
      .populate('books.$*')
      .execPopulate()
      .catch(next)
  )
})

module.exports = router
