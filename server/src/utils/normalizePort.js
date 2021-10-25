'use strict';

module.exports = (value) => {
  const PORT = parseInt(value, 10);

  if (isNaN(PORT)) {
    return value;
  }

  if (PORT >= 0) {
    return PORT;
  }

  return false;
};
