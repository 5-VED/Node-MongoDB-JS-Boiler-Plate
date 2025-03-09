const logger = require("../config/logger");
const nodemailer = require("nodemailer");

const transport = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  auth: {
    user: process.env.SMTP_USERNAME,
    pass: process.env.SMTP_PASSWORD,
  },
});

transport
  .verify()
  .then(() => logger.info("📧 Connected to email server 📧"))
  .catch(() =>
    logger.warn(
      "Unable to connect to email server. Make sure you have configured the SMTP options in .env"
    )
  );

const sendEmail = async (to, subject, data) => {
  try {
    return await transport
      .sendMail({
        from: process.env.SMTP_USERNAME,
        to: to,
        subject: subject,
        html: data,
      })
      .then(() => true)
      .catch((error) => {
        console.log(`---error--`, error);
      });
  } catch (err) {
    return err;
  }
};

module.exports = {
  sendEmail,
};
