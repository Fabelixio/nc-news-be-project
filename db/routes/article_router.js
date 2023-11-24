const express = require('express')
const router = express.Router()
const { getArticleById, getArticles, updateArticleVotes } = require('../controllers/article.controllers')
const {getCommentsByArticleId, postComment} = require('../controllers/comments.controller')

router.get('/', getArticles)
router.get('/:article_id', getArticleById)
router.get('/:article_id/comments', getCommentsByArticleId)
router.post('/:article_id/comments', postComment)
router.patch('/:article_id', updateArticleVotes)

module.exports = router