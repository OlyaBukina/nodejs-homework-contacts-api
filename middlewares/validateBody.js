const { HttpError } = require("../helpers");

const validateBody = (schema) => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      next(HttpError(400, "Error from Joi or some other validation library"));
    }
    next();
  };

  return func;
};

module.exports = validateBody;
