const {retrieveArticleById, retrieveAllArticles, updateArticleVotesById} = require("./../models/article.models")
const { checkExists } = require('../seeds/utils')

exports.getArticles = (req, res, next) => {
    const { topic } = req.query
    const topicPromise = [retrieveAllArticles(topic)]
    if(topic) {
        topicPromise.push(checkExists("topics", "slug", topic))
    }
    Promise.all(topicPromise)
    .then((resolvedPromise) => {
        const article = resolvedPromise[0]
        res.status(200).send({ article })
    })
    .catch(next)
}

exports.getArticleById = (req, res, next) => {
    const { article_id } = req.params
    retrieveArticleById(article_id)
    .then((article) => {
        res.status(200).send({article: article})
    })
    .catch(next)
}

exports.updateArticleVotes = (req, res, next) => {
    const { article_id } = req.params
    const { inc_votes } = req.body
    updateArticleVotesById(article_id, inc_votes)
    .then((article) => {
        res.status(200).send({article: article})
    })
    .catch(next)
}