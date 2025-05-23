const express = require("express");
const authController = require("../Controllers/auth.controller");
const validate = require("../Middlewares/validate");
const { authValidation } = require("../Validations");
const auth = require("../Middlewares/auth");

const router = express.Router();

/**
 * Login
 */
router.post("/login", validate(authValidation.login), authController.userLogin);

/**
 * Signup
 */
router.post("/signup", validate(authValidation.signup), authController.signupUser);

/**
 * Send OTP.
 */
router.post(
  "/send-otp",
  validate(authValidation.sendOtp),
  authController.sendOtp
);

/**
 * Verify OTP.
 */
router.post(
  "/verify-otp",
  validate(authValidation.verifyOtp),
  authController.verifyOtp
);

/**
 * Forgot password.
 */
router.put(
  "/forgot-password",
  validate(authValidation.forgotPassword),
  authController.forgotPassword
);

/**
 * Change password.
 */
router.put(
  "/reset-password",
  auth({isTokenRequired: true, usersAllowed: ["*"]}),
  validate(authValidation.changePassword),
  authController.changePassword
);

module.exports = router;
