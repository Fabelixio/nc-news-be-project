const db = require('./../connection')

exports.retrieveTopics = () => {
    return db.query('SELECT * FROM topics')
    .then(({ rows }) => {
        return rows
    })
}