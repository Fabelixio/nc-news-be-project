const {retrieveArticleById, retrieveAllArticles, updateArticleVotesById} = require("./../models/article.models")
const { checkExists } = require('../seeds/utils')

exports.getArticles = (req, res, next) => {
    const { topic } = req.query
    if(topic) {
        checkExists("topics", "slug", topic)
        .then(() => {
            retrieveAllArticles(topic)
            .then((articles) => {
                res.status(200).send({ articles })
            })
        })
        .catch(next)
    } else {
        retrieveAllArticles()
        .then((articles) => {
            res.status(200).send({ articles })
        })
        .catch(next)
    }
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