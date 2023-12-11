const express = require('express')
const { handleServerErrors, handlePsqlErrors, handleCustomErrors, handles404 } = require("./../errors")
const { getJson } = require("./../controllers/api.controller")
const articleRouter = require('../routes/article_router')
const topicRouter = require('../routes/topic_router')
const commentsRouter = require('../routes/comment_router')
const userRouter = require('../routes/user_router')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json())

app.get('/api', getJson)

app.get('/api/users', userRouter)
app.use('/api/articles', articleRouter)
app.use('/api/topics', topicRouter)
app.use('/api/comments', commentsRouter)
app.use('/api/users', userRouter)

app.use(handleCustomErrors);
app.use(handlePsqlErrors);
app.use(handleServerErrors);
app.all("*", handles404)

module.exports = app