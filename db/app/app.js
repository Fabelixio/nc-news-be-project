const express = require('express')
const {getTopics} = require('./../controllers/topic.controllers')
const {handleServerErrors,
    handlePsqlErrors,
    handleCustomErrors,
    handles404} = require("./../errors")
const {getJson} = require("./../controllers/api.controller")

const app = express()

app.get('/api/topics', getTopics)

app.get('/api', getJson)

app.use(handleCustomErrors);

app.use(handlePsqlErrors);

app.use(handleServerErrors);

app.all("*", handles404)


module.exports = app