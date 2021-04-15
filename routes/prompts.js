const express = require('express')
const Prompt = require('../models/Prompt')
const router = express.Router()

router.get('/', async (req, res, next) => {
  res.json(await Prompt.find().populate('book').catch(next))
})

router.get('/:_id', async (req, res, next) => {
  const { _id } = req.params
  res.json(await Prompt.findById(_id).catch(next))
})

router.get('/option', async (req, res, next) => {
  const { option } = req.params
  res.json(await Prompt.findById(option).catch(next))
})

router.delete('/', async (req, res, next) => {
  res.json(await Prompt.deleteMany({}).catch(next))
})

router.delete('/:_id', async (req, res, next) => {
  const { _id } = req.params
  res.json(await Prompt.findByIdAndDelete(_id).catch(next))
})

router.post('/', async (req, res, next) => {
  res.json(await Prompt.create(req.body).catch(next))
})

module.exports = router
