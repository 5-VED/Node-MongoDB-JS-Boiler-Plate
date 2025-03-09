const express = require("express");
const authController = require("../controllers/auth.controller");
const validate = require("../middlewares/validate");
const { authValidation } = require("../validations");
const auth = require("../middlewares/auth");

const router = express.Router();

/**
 * Login
 */
router.post("/login", validate(authValidation.login), authController.userLogin);

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
  auth,
  validate(authValidation.changePassword),
  authController.changePassword
);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *             example:
 *               email: fake@example.com
 *               password: password1
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 tokens: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NjNiNjI2YjhkMjQ3NzI1MjJmNDI0ZDYiLCJpYXQiOjE3MTU0MDQ1ODF9.H92L41cNCqsNLmcm5UCpqULMCKsadcfPDoZC5JDtCso
 *       "401":
 *         description: Invalid email or password
 */

/**
 * @swagger
 * /auth/send-otp:
 *   post:
 *     summary: Send OTP API
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *             example:
 *               email: "fake@example.com"
 *     responses:
 *       "200":
 *         description: OTP sent successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthTokens'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 */

/**
 * @swagger
 * /auth/forgot-password:
 *   post:
 *     summary: Forgot password
 *     description: An email will be sent to reset password.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *             example:
 *               email: fake@example.com
 *     responses:
 *       "204":
 *         description: No content
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */

/**
 * @swagger
 * /auth/reset-password:
 *   post:
 *     summary: Reset password
 *     tags: [Auth]
 *     parameters:
 *       - in: query
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *         description: The reset password token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - password
 *             properties:
 *               password:
 *                 type: string
 *                 format: password
 *                 minLength: 8
 *                 description: At least one number and one letter
 *             example:
 *               password: password1
 *     responses:
 *       "204":
 *         description: No content
 *       "401":
 *         description: Password reset failed
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               code: 401
 *               message: Password reset failed
 */

/**
 * @swagger
 * /auth/verify-otp:
 *  post:
 *    summary: verify otp
 *    tags: [Auth]
 *    requestBody:
 *     required: true
 *     content:
 *       application/json:
 *        schema:
 *         type: object
 *         required:
 *           - email
 *           - otp
 *         properties:
 *          email:
 *            type: string
 *          otp:
 *            type: string
 *     responses:
 *       "204":
 *         description: OK
 *       "401":
 *         description: verify email failed
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               code: 401
 *               message: verify email failed
 */
