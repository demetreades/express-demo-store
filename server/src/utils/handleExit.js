'use strict';

const logger = require('./logger');

module.exports = (event) => {
  return (error) => {
    if (error !== undefined) {
      logger.error(error.stack);
    }
    logger.info(event);
    process.exit();
  };
};
