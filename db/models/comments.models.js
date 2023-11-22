const db = require('../connection')

exports.retrieveCommentsByArticleId = (id) => {
    return db.query(`SELECT * FROM comments WHERE article_id = $1 ORDER BY created_at DESC`, [id])
    .then(({ rows }) => {
        return rows
    })
}

exports.createComment = (body, author, article_id) => {
   return db.query(
    `INSERT INTO comments (body, author, article_id) VALUES ($1, $2, $3) RETURNING *`, [body, author, article_id] )
    .then((data) => {
        return data.rows
    })
  };