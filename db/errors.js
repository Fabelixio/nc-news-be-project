exports.handlePsqlErrors = (err, req, res, next) => {
    if(err.code === "22P02") {
        res.status(400).send({ msg: "bad request"})
    } else {
        next(err)
    }
}

exports.handleCustomErrors = (err, req, res, next) => {
    if (err.status && err.msg) {
      res.status(err.status).send({ msg: err.msg });
    } else {
      next(err);
    }
  };

exports.handles404 = (req, res) => {
    res.status(404).send({msg: "path not found"})
}

exports.handleServerErrors = (err, req, res, next) => {
    console.log(err);
    res.status(500).send({ msg: "Internal Server Error" });
  };