const admin = require("firebase-admin");
const firebaseConfig = require("../json/firebaseNotification.json");


const firebaseAdmin = admin.initializeApp({
    credential: admin.credential.cert(firebaseConfig),
});

/**
 * Send notification
 * @param {string} deviceToken
 * @param {string} title
 * @param {string} body
 * @param {string} type
 * @param {string | null} typeId
 */
const sendNotification = async (deviceTokens, title, body) => {
    if (deviceTokens.length) {
        for (let deviceToken of deviceTokens) {
            try {
                const message = {
                    notification: {
                        title: title,
                        body: body,
                    },
                    token: deviceToken,
                };
                const notification = await firebaseAdmin.messaging().send(message);
                console.log(
                    "::::::::: notification :::::::::",
                    notification
                );
            } catch (error) {
                console.log("Notification Error: ", error);
            }
        }
    }
};

/**
 * All firebase services are exported from here 👇
 */
module.exports = {
    sendNotification,
};
