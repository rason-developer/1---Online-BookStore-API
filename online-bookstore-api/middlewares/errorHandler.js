const logger = require('../logger/winston');

function errorHandler(err, req, res, next) {
  logger.error(`Error: ${err.message}`);
  res.status(err.status || 500).json({ message: err.message });
}

module.exports = errorHandler;