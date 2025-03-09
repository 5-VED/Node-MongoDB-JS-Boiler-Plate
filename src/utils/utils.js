const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = {
    hashPassword: async ({ password }) => {
        const hash = await bcrypt.hash(password, 10);
        return hash;
    },

    generateToken: (data) => {
        const token = jwt.sign(
            data,
            process.env.JWT_SECRET /* { expiresIn: process.env.JWT_EXPIRES_IN } */
        );
        return token;
    },

    decodeToken: ({ token }) => {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return decoded;
    },

    comparePassword: async ({ password, hash }) => {
        const isPasswordMatch = await bcrypt.compare(password, hash);
        return isPasswordMatch;
    },
};
