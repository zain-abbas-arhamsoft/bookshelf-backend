const User = require("../models/user.model");
const { bypassedRoutes } = require("../../config/var");
const { userAuthTokenError } = require("../../config/user-messages");

exports.authenticate = async (req, res, next) => {
  const { headers, originalUrl } = req;
  const lastPathSegment = originalUrl.split("/").pop().toLowerCase();
  if (bypassedRoutes.includes(lastPathSegment)) return next();
  else if (headers.authorization) {
    // check if user access token is valid or not
    const accessToken = headers.authorization.split(" ").pop();
    const user = await User.findOne({ accessToken }, "_id");
    if (user) {
      req.userId = user._id;
      return next();
    }
  }

  return res.status(403).send({ success: false, message: userAuthTokenError });
};
