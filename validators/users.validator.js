const Joi = require("joi");
const validator = require("validator");
const isValidEmail = (value, helper) => {
  if (!validator.isEmail(value)) {
    return helper.message("Valid Email Address Required ");
  }
  return true;
};
const usersSchema = Joi.object().keys({
  username: Joi.string().required(),
  password: Joi.string().required(),
  email: Joi.string().custom(isValidEmail),
});

module.exports = { usersSchema };
