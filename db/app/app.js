const express = require('express')
const {getTopics} = require('./../controllers/topic.controllers')
const {handleServerErrors, handlePsqlErrors, handleCustomErrors, handles404} = require("./../errors")
const {getJson} = require("./../controllers/api.controller")
const { getArticleById, getArticles, updateArticleVotes } = require('../controllers/article.controllers')
const { getCommentsByArticleId, postComment, deleteCommentById } = require('../controllers/comments.controller')
const { getUsers } = require('../controllers/users.controllers')

const app = express()
app.use(express.json())

app.get('/api/topics', getTopics)

app.get('/api', getJson)

app.get('/api/articles/:article_id', getArticleById)

app.get('/api/articles', getArticles)

app.get('/api/articles/:article_id/comments', getCommentsByArticleId)

app.post('/api/articles/:article_id/comments', postComment)

app.patch('/api/articles/:article_id', updateArticleVotes)

app.delete('/api/comments/:comment_id', deleteCommentById)

app.get('/api/users', getUsers)

app.use(handleCustomErrors);
app.use(handlePsqlErrors);
app.use(handleServerErrors);
app.all("*", handles404)

module.exports = app