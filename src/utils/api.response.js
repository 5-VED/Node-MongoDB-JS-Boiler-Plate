const  HTTP_CODES  = require("http-status");

module.exports = {
    BAD_REQUEST: ({ res, message = "-", data = {} } = {}) => {
        res.status(HTTP_CODES.BAD_REQUEST).json({
            success: false,
            message: message,
            payload: data,
        });
    },

    DUPLICATE_VALUE: ({ res, message, data = {} } = {}) => {
        res.status(HTTP_CODES.CONFLICT).json({
            success: false,
            message: message || "Duplicate value.",
            payload: data,
        });
    },

    FORBIDDEN: ({ res, message = "-", data = {} } = {}) => {
        res.status(HTTP_CODES.FORBIDDEN).json({
            success: false,
            message: message,
            payload: data,
        });
    },

    CATCH_ERROR: ({ res, message = "-", data = {} } = {}) => {
        let responseCode = HTTP_CODES.INTERNAL_SERVER_ERROR;
        if ((message && message.includes("validation failed")) || message.includes("duplicate key error collection")) responseCode = HTTP_CODES.BAD_REQUEST;
        res.status(responseCode).json({
            success: false,
            message: message,
            payload: data,
        });
    },

    METHOD_NOT_ALLOWED: ({ res, message = "-", data = {} } = {}) => {
        res.status(HTTP_CODES.METHOD_NOT_ALLOWED).json({
            success: false,
            message: message,
            payload: data,
        });
    },

    MOVED_PERMANENTLY: ({ res, message = "-", data = {} } = {}) => {
        res.status(HTTP_CODES.MOVED_PERMANENTLY).json({
            success: false,
            message: message,
            payload: data,
        });
    },

    NOT_ACCEPTABLE: ({ res, message = "-", data = {} } = {}) => {
        res.status(HTTP_CODES.NOT_ACCEPTABLE).json({
            success: false,
            message: message,
            payload: data,
        });
    },

    NOT_FOUND: ({ res, message = "-", data = {} } = {}) => {
        res.status(HTTP_CODES.NOT_FOUND).json({
            success: false,
            message: message,
            payload: data,
        });
    },

    NO_CONTENT_FOUND: ({ res, message = "-", data = {} } = {}) => {
        res.status(HTTP_CODES.NO_CONTENT).json({
            success: false,
            message: message,
            payload: data,
        });
    },

    OK: ({ res, message = "-", data = {} } = {}) => {
        res.status(HTTP_CODES.OK).json({
            success: true,
            messages: message,
            payload: data,
        });
    },

    PERMANENT_REDIRECT: ({ res, message = "-", data = {} } = {}) => {
        res.status(HTTP_CODES.PERMANENT_REDIRECT).json({
            success: false,
            message: message,
            payload: data,
        });
    },

    UNAUTHORIZED: ({ res, message = "-", data = {} } = {}) => {
        res.status(HTTP_CODES.UNAUTHORIZED).json({
            success: false,
            message: message,
            payload: data,
        });
    },

    UPGRADE_REQUIRED: ({ res, message = "-", data = {} } = {}) => {
        res.status(HTTP_CODES.UPGRADE_REQUIRED).json({
            success: false,
            message: message,
            payload: data,
        });
    },

    VALIDATION_ERROR: ({ res, message = "-", data = {} } = {}) => {
        res.status(HTTP_CODES.VARIANT_ALSO_NEGOTIATES).json({
            success: false,
            message: message,
            payload: data,
        });
    },
};
