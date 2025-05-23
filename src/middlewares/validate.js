const Joi = require("joi");
const pick = require("../Utils/pick");
const apiResponse = require("../Utils/api.response");

const errors = {
  labels: true,
w};

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
