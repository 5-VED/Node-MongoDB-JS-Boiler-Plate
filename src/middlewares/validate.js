const Joi = require("joi");
const pick = require("../utils/pick");
const apiResponse = require("../utils/api.response");

const errors = {
  labels: true,
};

const validate = (schema) => (req, res, next) => {
  const validSchema = pick(schema, ["params", "query", "body"]);
  const object = pick(req, Object.keys(validSchema));
  const { value, error } = Joi.compile(validSchema)
    .prefs({ errors: { label: "key" }, abortEarly: false })
    .validate(object, errors);

  if (error) {
      return apiResponse.NOT_FOUND({ res, message: error.details.map((ele) => ele.message).join(", ") }) 
  }
  Object.assign(req, value);
  return next();
};

module.exports = validate;
