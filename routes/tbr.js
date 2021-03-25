const express = require('express')
const Tbr = require('../models/Tbr')
const router = express.Router()

router.get('/', async (req, res, next) => {
  res.json(await Tbr.find().populate('author').catch(next))
})

router.get('/:_id', async (req, res, next) => {
  const { _id } = req.params
  res.json(await Tbr.findById(_id).populate('author').catch(next))
})

router.patch('/:_id/vote', async (req, res, next) => {
  const { _id } = req.params
  res.json(
    await Tbr.findByIdAndUpdate(
      id,
      { $inc: { votes: 1 } },
      { new: true }
    ).catch(next)
  )
})

router.delete('/:_id', async (req, res, next) => {
  const { _id } = req.params
  res.json(await Tbr.findByIdAndDelete(_id).catch(next))
})

router.post('/', async (req, res, next) => {
  res.json(
    await (await Tbr.create(req.body).catch(next)) // nested await is needed
      .populate('author')
      .execPopulate()
      .catch(next)
  )
})

module.exports = router
