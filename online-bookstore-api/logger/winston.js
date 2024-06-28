const {createLogger, format, transports} = require('winston');
const {combine, timestamp, printf,colorize, errors, splat, json ,simple} = format;

//Custom log format for console with colors
const consoleFormat = printf(({level, message, timestamp, stack}) => {
    return `${timestamp} ${level}: ${stack || message} `;
})

const logger = createLogger({
    level:'info',
    format: combine(
        timestamp({format: 'YYYY-MM-DD HH:mm:ss'}),
        errors({stack: true}),
        splat(),
        json()
    ),
    defaultMeta: {service:'online-bookstore-service'},
    transports: [
        new transports.File({filename: 'logs/errors.log', level:'error'}),
        new transports.File({filename: 'logs/combined.log'})

    ]
    
});

const node_env = process.env.NODE_ENV || "dev";

if (node_env !== 'production' ) {
    logger.add(new transports.Console({
        format:combine(
            colorize(),
            timestamp({format: 'YYYY-MM-DD HH:mm:ss'}),
            consoleFormat
         )
    }));
}

module.exports = logger;