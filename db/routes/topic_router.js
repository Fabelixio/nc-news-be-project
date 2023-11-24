const express = require('express')
const router = express.Router()
const {getTopics} = require('../controllers/topic.controllers')

router.get('/', getTopics)

module.exports = router