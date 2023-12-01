const validateSchema = (schema) => (req, res, next) => {
  console.log("username", req.body.password);
  const { error } = schema.validate(req.body);
  console.log({ error });

  if (error) {
    const { message } = error;
    res.json({ message });
  } else {
    next();
  }
};

module.exports = { validateSchema };
