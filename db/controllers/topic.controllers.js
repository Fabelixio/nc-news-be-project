const {retrieveTopics} = require("../models/topic.models")


exports.getTopics = (req, res, next) => {
    retrieveTopics()
    .then((topics) => {
        res.status(200).send({topics: topics})
    })
    .catch(next)
}