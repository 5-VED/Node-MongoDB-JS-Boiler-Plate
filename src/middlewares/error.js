const apiResponse = require("../utils/api.response");
const messages = require("../json/message.json");
const { MulterError } = require("multer");
const { JsonWebTokenError, NotBeforeError, TokenExpiredError } = require("jsonwebtoken")


module.exports = async (error, req, res, next) => {
  console.log("ERROR MESSAGE: ", error.message, "\nERROR STACK: ", error.stack);

  if (error instanceof MulterError) return apiResponse.BAD_REQUEST({ res, message: messages.INVALID_FILE, data: { context: error.code } });

  if (error instanceof JsonWebTokenError || error instanceof NotBeforeError || error instanceof TokenExpiredError) return apiResponse.UNAUTHORIZED({ res, message: messages.INVALID_TOKEN });

  return apiResponse.CATCH_ERROR({ res, message: messages.INTERNAL_SERVER_ERROR, data: { context: error.message } });
};
