const {retrieveArticleById, retrieveAllArticles,} = require("./../models/article.models")

exports.getArticles = (req, res, next) => {
    retrieveAllArticles()
    .then((articles) => {
        res.status(200).send({ article: articles })
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