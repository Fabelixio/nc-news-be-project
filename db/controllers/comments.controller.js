const { retrieveCommentsByArticleId } = require('./../models/comments.models')
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