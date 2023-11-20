const endpoints = require("../../endpoints.json")
const fs = require('fs')

exports.getJson = (req, res, next) => {
        res.status(200).send({ endpoints })
}
