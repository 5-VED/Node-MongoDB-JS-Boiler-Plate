const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf } = format;
const DailyRotateFile = require('winston-daily-rotate-file');

// Define log format
const logFormat = printf(({ level, message, timestamp }) => {
    return `${timestamp} [${level}]: ${message}`;
});

// Create a logger instance
const logger = createLogger({
    level: 'info', // Set the default log level
    format: combine(
        timestamp(), // Add timestamp to logs
        logFormat // Apply custom log format
    ),
    transports: [
        // Log to console with colorized output
        new transports.Console({
            format: format.combine(
                format.colorize(), // Colorize output
                format.simple() // Use simple format
            )
        }),
        // Log to a file
        new DailyRotateFile({
            filename: 'logs/%DATE%.log',
            datePattern: 'YYYY-MM-DD',
            zippedArchive: true,
            maxSize: '20m', // Rotate logs if they exceed 20MB
            maxFiles: '14d' // Keep logs for 14 days
        })
    ]
});

// Add a custom log level for warnings
logger.add(new transports.Console({
    format: format.combine(
        format.colorize(), // Colorize output
        format.simple() // Use simple format
    ),
    level: 'warn' // Set log level to warn
}));

module.exports = logger;
