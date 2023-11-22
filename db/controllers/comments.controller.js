const { retrieveCommentsByArticleId, createComment } = require('./../models/comments.models')
const { checkExists } = require("../seeds/utils")


exports.getCommentsByArticleId = (req, res, next) => {
    const { article_id } = req.params
    const commentPromises = [
        retrieveCommentsByArticleId(article_id),
        checkExists("articles", "article_id", article_id)]

    Promise.all(commentPromises).then((resolvedPromise) => {
        const comments = resolvedPromise[0]
        res.status(200).send({ comments })
    })
    .catch(next)
}

exports.postComment = (req, res, next) => {
    const author = req.body.username
    const body = req.body.body
    const article_id = req.params.article_id
    const commentPromise = createComment(body, author, article_id)
    const articlePromise = checkExists("articles", "article_id", article_id)
    const promiseArray = [commentPromise, articlePromise]
    Promise.all(promiseArray)
    .then((resolvedPromises) => {
        const commentArray = resolvedPromises[0]
        const comment = commentArray[0]
        res.status(201).send({ comment })
    })
    .catch(next)

};