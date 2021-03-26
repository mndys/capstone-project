const express = require('express')
const CurrentReads = require('../models/CurrentRead')
const router = express.Router()

router.get('/', async (req, res, next) => {
  res.json(await CurrentReads.find().populate('author').catch(next))
})

router.get('/:_id', async (req, res, next) => {
  const { _id } = req.params
  res.json(await CurrentReads.findById(_id).populate('author').catch(next))
})

router.patch('/:_id/vote', async (req, res, next) => {
  const { _id } = req.params
  res.json(
    await CurrentReads.findByIdAndUpdate(
      _id,
      { $inc: { votes: 1 } },
      { new: true }
    ).catch(next)
  )
})

router.delete('/:_id', async (req, res, next) => {
  const { _id } = req.params
  res.json(await CurrentReads.findByIdAndDelete(_id).catch(next))
})

router.post('/', async (req, res, next) => {
  res.json(
    await (await CurrentReads.create(req.body).catch(next)) // nested await is needed
      .populate('author')
      .execPopulate()
      .catch(next)
  )
})

module.exports = router
