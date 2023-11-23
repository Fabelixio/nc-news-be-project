const { retrieveUsers } = require('../models/users.models')


exports.getUsers = (req, res, next) => {
    retrieveUsers()
    .then((users) => {
        res.status(200).send({ users })
    })
}