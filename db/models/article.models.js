const db = require("./../connection")

exports.retrieveAllArticles = (topic, sortBy = 'created_at', order = 'DESC') => {
    const queryTopic = []
    const validSort = [
        "author",
        "title",
        "topic",
        "created_at",
        "votes",
        "article_id",
        "comment_count",
        "article_img_url"
    ]
    const validOrder = ["ASC", "DESC"]
    if(!validSort.includes(sortBy) || !validOrder.includes(order)) {
        return Promise.reject({status: 400, msg: "bad request"})
    }
    let queryString = `
    SELECT articles.author, articles.title, articles.topic, articles.article_id, articles.created_at, articles.votes, articles.article_img_url, COUNT(comments.article_id) AS comment_count
    FROM articles
    FULL OUTER JOIN comments ON articles.article_id = comments.article_id`
    if (topic) {
        queryTopic.push(topic)
        queryString += ` WHERE articles.topic = $1`
    }
    queryString += ` GROUP BY articles.author, articles.title, articles.topic, articles.article_id, articles.created_at, articles.votes, articles.article_img_url
    ORDER BY ${sortBy} ${order}`
    return db.query(queryString, queryTopic)
    .then(({ rows }) => {
        return rows
    })
}

exports.retrieveArticleById = (article_id) => {
    return db.query(`SELECT articles.author, articles.body, articles.title, articles.topic, articles.article_id, articles.created_at, articles.votes, articles.article_img_url, COUNT(comments.article_id) AS comment_count
    FROM articles
    FULL OUTER JOIN comments
    ON articles.article_id = comments.article_id
    WHERE articles.article_id = $1
    GROUP BY articles.article_id`, [article_id])
    .then(({ rows }) => {
        if(rows.length === 0) {
            return Promise.reject({ status: 404, msg: 'article does not exist'})
        } else {
            return rows[0]
        }
    })
}

exports.updateArticleVotesById = (articleId, incVotes) => {
    return db.query(`UPDATE articles
    SET votes = votes + $2
    WHERE article_id = $1
    RETURNING *`, [articleId, incVotes])
    .then(({ rows }) => {
        if(rows.length === 0) {
            return Promise.reject({ status: 404, msg: 'article does not exist'})
        } else {
            return rows[0]
        }
    })
}