const { generateToken } = require("../Utils/utils");
const emailService = require("../Services/email-sending");
const bcrypt = require("bcryptjs");
const message = require("../Constants/message")
const emailTemplate = require("../Templates/emailTemplate");
const { UserModel, OtpModel } = require("../Models");
const apiResponse = require("../Utils/api.response");
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
      }).populate("roleId");

      if (!emailExist) {
        return apiResponse.NOT_FOUND({
          res,
          message: message.EMAIL_NOT_FOUND,
        }); 
      }

      if (!(await emailExist.isPasswordMatch(password))) {
        return apiResponse.BAD_REQUEST({
          res,
          message: message.INVALID_PASSWORD,
        });
      }
      return apiResponse.OK({
        res,
        message: message.USER_LOGIN_SUCCESSFULLY,
        data: {
          user: emailExist,
          tokens: await generateToken({ user_id: emailExist._id }), // Generate auth token.
        },
      });
    } catch (err) {
      logger.error("error generating", err);
      return apiResponse.CATCH_ERROR({
        res,
        message: message.INTERNAL_SERVER_ERROR,
      });
    }
  },

  sendOtp: async (req, res) => {
    try {
      const { email } = req.body;

      const emailExist = await UserModel.findOne({
        email,
        deletedAt: null,
      }).populate("roleId"); 

      if (!emailExist) {
        return apiResponse.NOT_FOUND({
          res,
          message: message.EMAIL_NOT_FOUND,
        }); 
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
        message: message.OTP_SENT,
      });
    } catch (err) {
      logger.error("error generating", err);
      return apiResponse.CATCH_ERROR({
        res,
        message: message.INTERNAL_SERVER_ERROR,
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
          message: message.EMAIL_NOT_FOUND,
        }); 
      }

      let otpExists = await OtpModel.findOne({ userId: emailExist._id });
      console.log(`---otpExists--`, otpExists);

      if (!otpExists) {
        return apiResponse.NOT_FOUND({ res, message: message.INVALID_OTP }); 
      }

      if (otpExists.otp !== otp) {
        return apiResponse.BAD_REQUEST({ res, message: message.INVALID_OTP }); 
      }

      if (otpExists.expires <= new Date()) {
        return apiResponse.BAD_REQUEST({ res, message: message.OTP_EXPIRED }); 
      }

      return apiResponse.OK({
        res,
        message: message.OTP_VERIFIED,
      });
    } catch (err) {
      logger.error("error generating", err);
      return apiResponse.CATCH_ERROR({
        res,
        message: message.INTERNAL_SERVER_ERROR,
      });
    }
  },

  forgotPassword: async (req, res) => {
    try {
      const reqBody = req.body;

      const emailExist = await UserModel.findOne({
        email: reqBody.email,
        deletedAt: null,
      }).populate("roleId");

      if (!emailExist) {
        return apiResponse.NOT_FOUND({
          res,
          message: message.EMAIL_NOT_FOUND,
        });
      }

      let password = await bcrypt.hashSync(reqBody.password, 8);

      await UserModel.findOneAndUpdate(
        { _id: emailExist._id, deletedAt: null },
        { $set: { password: password } },
        { new: true }
      ); 

      return apiResponse.OK({
        res,
        message: message.PASSWORD_CHANGED,
      });
    } catch (err) {
      logger.error("error generating", err);
      return apiResponse.CATCH_ERROR({
        res,
        message: message.INTERNAL_SERVER_ERROR,
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
          message: message.WRONG_PASSWORD,
        });
      }

      let password = bcrypt.hashSync(reqBody.newPassword, 8);

      await UserModel.findOneAndUpdate(
        { _id: req.user._id._id, deletedAt: null },
        { $set: { password: password } },
        { new: true }
      );

      return apiResponse.OK({
        res,
        message: message.PASSWORD_CHANGED,
      });
    } catch (err) {
      logger.error("error generating", err);
      return apiResponse.CATCH_ERROR({
        res,
        message: message.INTERNAL_SERVER_ERROR,
      });
    }
  },

  
};
