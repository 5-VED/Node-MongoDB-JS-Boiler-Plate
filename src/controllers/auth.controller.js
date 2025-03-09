const { generateToken } = require("../utils/utils");
const emailService = require("../services/email-sending");
const bcrypt = require("bcryptjs");
const message = require("../json/message.json");
const emailTemplate = require("../templates/emailTemplate");
const { UserModel, OtpModel } = require("../models");
const apiResponse = require("../utils/api.response");
const moment = require("moment");
const logger = require("../config/logger");

/**
 * POST: Login (User)
 */
module.exports = {
  userLogin: async (req, res) => {
    try {
      const { email, password } = req.body;

      let emailExist = await UserModel.findOne({
        email,
        deletedAt: null,
      }).populate("roleId"); // Get user by email.

      if (!emailExist) {
        return apiResponse.NOT_FOUND({
          res,
          message: message.email_not_register,
        }); // If email doesn't exist, throw an error.
      }

      if (!(await emailExist.isPasswordMatch(password))) {
        return apiResponse.BAD_REQUEST({
          res,
          message: message.invalid_password,
        }); // If password doesn't match the user's password, throw an error.
      }
      return apiResponse.OK({
        res,
        message: message.login_successful,
        data: {
          user: emailExist,
          tokens: await generateToken({ user_id: emailExist._id }), // Generate auth token.
        },
      });
    } catch (err) {
      logger.error("error generating", err);
      return apiResponse.CATCH_ERROR({
        res,
        message: message.something_went_wrong,
      });
    }
  },

  sendOtp: async (req, res) => {
    try {
      const { email } = req.body;

      const emailExist = await UserModel.findOne({
        email,
        deletedAt: null,
      }).populate("roleId"); // Get user by email.

      if (!emailExist) {
        return apiResponse.NOT_FOUND({
          res,
          message: message.email_not_register,
        }); // If email doesn't exist, throw an error.
      }

      const generateOtp = () =>
        ("0".repeat(4) + Math.floor(Math.random() * 10 ** 4)).slice(-4);

      let otp = await generateOtp();

      const expireTime = moment().add(10, "minute");
      await OtpModel.findOneAndUpdate(
        { userId: emailExist._id },
        { $set: { otp: otp, userId: emailExist._id, expires: expireTime } },
        { upsert: true }
      );

      await emailService.sendEmail(
        email,
        "Verify Otp",
        emailTemplate.sendOTP(email, otp)
      );

      return apiResponse.OK({
        res,
        message: message.otp_sent_email,
      });
    } catch (err) {
      logger.error("error generating", err);
      return apiResponse.CATCH_ERROR({
        res,
        message: message.something_went_wrong,
      });
    }
  },

  verifyOtp: async (req, res) => {
    try {
      const { email, otp } = req.body;

      let emailExist = await UserModel.findOne({
        email,
        deletedAt: null,
      }).populate("roleId"); // Get user by email.

      if (!emailExist) {
        return apiResponse.NOT_FOUND({
          res,
          message: message.email_not_register,
        }); // If email doesn't exist, throw an error.
      }

      let otpExists = await OtpModel.findOne({ userId: emailExist._id });
      console.log(`---otpExists--`, otpExists);

      if (!otpExists) {
        return apiResponse.NOT_FOUND({ res, message: message.otp_invalid }); // If email doesn't exist, throw an error.
      }

      if (otpExists.otp !== otp) {
        return apiResponse.BAD_REQUEST({ res, message: message.otp_invalid }); // If email doesn't exist, throw an error.
      }

      if (otpExists.expires <= new Date()) {
        return apiResponse.BAD_REQUEST({ res, message: message.otp_expired }); // If email doesn't exist, throw an error.
      }

      return apiResponse.OK({
        res,
        message: message.otp_verify_success,
      });
    } catch (err) {
      logger.error("error generating", err);
      return apiResponse.CATCH_ERROR({
        res,
        message: message.something_went_wrong,
      });
    }
  },

  forgotPassword: async (req, res) => {
    try {
      const reqBody = req.body;

      const emailExist = await UserModel.findOne({
        email: reqBody.email,
        deletedAt: null,
      }).populate("roleId"); // Get user by email.

      if (!emailExist) {
        return apiResponse.NOT_FOUND({
          res,
          message: message.email_not_register,
        }); // If email doesn't exist, throw an error.
      }

      let password = await bcrypt.hashSync(reqBody.password, 8);

      await UserModel.findOneAndUpdate(
        { _id: emailExist._id, deletedAt: null },
        { $set: { password: password } },
        { new: true }
      ); // Update user password by _id.

      return apiResponse.OK({
        res,
        message: message.password_forgot,
      });
    } catch (err) {
      logger.error("error generating", err);
      return apiResponse.CATCH_ERROR({
        res,
        message: message.something_went_wrong,
      });
    }
  },

  changePassword: async (req, res) => {
    try {
      const reqBody = req.body;
      
      const user = await UserModel.findOne({ _id: req.user._id });

      if (!bcrypt.compareSync(reqBody.oldPassword, user.password)) {
        return apiResponse.BAD_REQUEST({
          res,
          message: message.old_password_wrong,
        });
      }

      let password = await bcrypt.hashSync(reqBody.newPassword, 8);

      await UserModel.findOneAndUpdate(
        { _id: req.user._id._id, deletedAt: null },
        { $set: { password: password } },
        { new: true }
      ); // Update user password by _id.

      return apiResponse.OK({
        res,
        message: message.password_forgot,
      });
    } catch (err) {
      logger.error("error generating", err);
      return apiResponse.CATCH_ERROR({
        res,
        message: message.something_went_wrong,
      });
    }
  },
};
