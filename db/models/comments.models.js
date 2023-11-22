const db = require('../connection')

exports.retrieveCommentsByArticleId = (id) => {
    return db.query(`SELECT * FROM comments WHERE article_id = $1 ORDER BY created_at DESC`, [id])
    .then(({ rows }) => {
        return rows
    })
}