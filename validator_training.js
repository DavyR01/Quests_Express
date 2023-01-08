const validateMovie2 = (req, res, next) => {
  const { title } = req.body;

  if (title == null) {
    res.status(422).send("The field 'title' is required");
  } else {
    next();
  }
};

module.exports = {
  validateMovie2,
};
