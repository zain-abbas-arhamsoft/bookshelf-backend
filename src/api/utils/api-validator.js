const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

// validate input for register and login user
const validateUser = ({ body }, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    username: Joi.string().alphanum().min(2).max(30), // allow username field
    password: Joi.string().required().min(6).max(128),
  });
  const { error } = schema.validate(body);
  if (error) {
    const {
      details: [{ message: errMsg }],
    } = error;
    const errPattern = /"/gi;

    let message = errMsg.replaceAll(errPattern, "");
    message = `${message.charAt(0).toUpperCase()}${message.slice(1)}`;
    return res.status(400).send({ success: false, message });
  }
  return next();
};

const validateLogin = ({ body }, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required().min(6).max(128),
  });
  const { error } = schema.validate(body);
  if (error) {
    const {
      details: [{ message: errMsg }],
    } = error;
    const errPattern = /"/gi;

    let message = errMsg.replaceAll(errPattern, "");
    message = `${message.charAt(0).toUpperCase()}${message.slice(1)}`;
    return res.status(400).send({ success: false, message });
  }
  return next();
};

module.exports = {
  validateUser,
  validateLogin,
};
