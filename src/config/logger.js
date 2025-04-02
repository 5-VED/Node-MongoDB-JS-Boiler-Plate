const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf } = format;
const DailyRotateFile = require('winston-daily-rotate-file');

const logFormat = printf(({ level, message, timestamp }) => {
    return `${timestamp} [${level}]: ${message}`;
});

const logger = createLogger({
    level: 'info', 
    format: combine(
        timestamp(), 
        logFormat 
    ),
    transports: [        
        new transports.Console({
            format: format.combine(
                format.colorize(), 
                format.simple()
            )
        }),
        
        new DailyRotateFile({
            filename: 'logs/%DATE%.log',
            datePattern: 'YYYY-MM-DD',
            zippedArchive: true,
            maxSize: '20m', 
            maxFiles: '14d' 
        })
    ]
});


logger.add(new transports.Console({
    format: format.combine(
        format.colorize(), 
        format.simple() 
    ),
    level: 'warn'
}));

module.exports = logger;
