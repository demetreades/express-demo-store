'use strict';

const pino = require('pino');

module.exports = pino({
  transport: {
    target: 'pino-pretty',
    options: {
      destination: 2,
      levelFirst: true,
      translateTime: 'SYS:standard',
      ignore: 'hostname,pid',
    },
  },
});
