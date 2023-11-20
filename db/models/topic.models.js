const db = require('./../connection')

exports.retrieveJson = () => {
    
}

exports.retrieveTopics = () => {
    return db.query('SELECT * FROM topics')
    .then(({ rows }) => {
        return rows
    })
}