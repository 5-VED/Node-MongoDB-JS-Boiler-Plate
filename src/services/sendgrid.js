const sendGridMail = require("@sendgrid/mail");
sendGridMail.setApiKey(process.env.SENDGRID_API_KEY);
const logger = require("../config/logger");

const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const msg = {
  to: "test@example.com",
  from: "test@example.com", // Use the email address or domain you verified above
  subject: "Sending with Twilio SendGrid is Fun",
  text: "and easy to do anywhere, even with Node.js",
  html: "<strong>and easy to do anywhere, even with Node.js</strong>",
};
//ES6
sgMail.send(msg).then(
  () => {},
  (error) => {
    logger.log("Sending mail with Sendgrind");
    if (error.response) {
      logger.error("Error while Sending mail", error.response.body);
    }
  }
);
