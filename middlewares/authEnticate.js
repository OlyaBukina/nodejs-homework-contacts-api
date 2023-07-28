const jwt = require("jsonwebtoken");
const { User } = require("../models/user");

const { HttpError } = require("../helpers");

const { SECRET_KEY } = process.env;

const authEnticate = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");

  if (bearer !== "Bearer" || !token) {
    next(HttpError(401));
  }
  console.log(bearer !== "Bearer" || !token);
  try {
    const { _id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(_id);

    if (!user || !user.token || user.token !== token) {
      next(HttpError(401));
    }
    req.user = user;
    next();
  } catch {
    next(HttpError(401));
  }
};
module.exports = authEnticate;
