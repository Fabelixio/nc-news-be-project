const db = require("./../connection")

exports.retrieveAllArticles = () => {
    return db
    .query(`SELECT articles.*, COUNT(comments.article_id) AS comment_count
    FROM articles
    FULL OUTER JOIN comments ON articles.article_id = comments.article_id
    GROUP BY articles.author, articles.title, articles.topic, articles.article_id, articles.created_at, articles.votes, articles.article_img_url
    ORDER BY articles.created_at DESC`)
    .then(({ rows }) => {
        return rows
    })
}

exports.retrieveArticleById = (article_id) => {
    return db.query(`SELECT * 
    FROM articles
    WHERE articles.article_id = $1`, [article_id])
    .then(({ rows }) => {
        if(rows.length === 0) {
            return Promise.reject({ status: 404, msg: 'article does not exist'})
        } else {
            return rows[0]
        }
    })
}