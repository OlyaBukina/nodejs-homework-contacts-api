const { User, schemas } = require("../../models/user");

const { HttpError } = require("../../helpers");

const updateSubscription = async (req, res, next) => {
  if (JSON.stringify(req.body) === "{}") {
    throw HttpError(400, "missing field subscription");
  }

  const { error } = schemas.updateSubSchema.validate(req.body);
  if (error) {
    throw HttpError(400, error.message);
  }
  const { _id } = req.user;
  const user = await User.findByIdAndUpdate({ _id }, req.body, { new: true });

  if (!user) {
    throw HttpError(404, "Not found!");
  }

  res.status(200).json({
    user,
  });
};

module.exports = updateSubscription;
