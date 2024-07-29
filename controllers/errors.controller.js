exports.handleCustomErrors = (err, req, res, next) => {
  if (err.status) {
    res.status(err.status).send(err.message);
  } else {
    next(err);
  }
};

exports.handle500errors = (err, req, res, next) => {
  res.status(500).send({ message: "Internal Server Error" });
};
