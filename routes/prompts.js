const express = require('express')
const Prompts = require('../models/Prompt')
const router = express.Router()

router.get('/', async (req, res, next) => {
  res.json(await Prompts.find().catch(next))
})

router.get('/:_id', async (req, res, next) => {
  const { _id } = req.params
  res.json(await Prompts.findById(_id).catch(next))
})

router.delete('/:_id', async (req, res, next) => {
  const { _id } = req.params
  res.json(await Prompts.findByIdAndDelete(_id).catch(next))
})

router.post('/', async (req, res, next) => {
  res.json(await Prompts.create(req.body).catch(next))
})

module.exports = router
