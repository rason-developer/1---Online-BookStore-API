const morgan = require('morgan')
const logger = require('./winston')

// Morgan middleware setup to use winston for logging

const morganMiddleware = morgan('combined', {
    stream: {
        write: (message) => logger.info(message.trim())
    }
});

module.exports = morganMiddleware;