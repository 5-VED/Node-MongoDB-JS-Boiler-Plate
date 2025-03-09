const Joi = require("joi");

/**
 * Login.
 */
const login = {
  body: Joi.object().keys({
    email: Joi.string().trim().email().required(),
    password: Joi.string().trim().required(),
  }),
};

/**
 * Send OTP.
 */
const sendOtp = {
  body: Joi.object().keys({
    email: Joi.string().email().required(),
  }),
};

/**
 *log out
 */
const logout = {
  body: Joi.object().keys({
    fcmToken: Joi.string().optional().allow(""),
  }),
};

/**
 * Verify OTP.
 */
const verifyOtp = {
  body: Joi.object().keys({
    email: Joi.string().email().trim().required(),
    otp: Joi.string().trim().required(),
  }),
};

/**
 * Change password.
 */
const changePassword = {
  body: Joi.object().keys({
    oldPassword: Joi.string().trim().required(),
    newPassword: Joi.string().trim().required(),
  }),
};

/**
 * Forgot password.
 */
const forgotPassword = {
  body: Joi.object().keys({
    email: Joi.string().email().trim().required(),
    password: Joi.string().trim().required(),
  }),
};

/**
 * All auth validations are exported from here 👇
 */
module.exports = {
  login,
  sendOtp,
  verifyOtp,
  forgotPassword,
  changePassword,
  logout
};
