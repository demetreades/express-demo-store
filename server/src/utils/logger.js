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

// /////////////////////////////////////////
// /////////////////////////////////////////

// const pino = require('pino');

// const LEVELS = {
//   http: 10,
//   debug: 20,
//   info: 30,
//   warn: 40,
//   error: 50,
//   fatal: 60,
// };

// module.exports = pino(
//   {
//     prettyPrint: {
//       colorize: true,
//       levelFirst: true,
//       translateTime: 'SYS:standard',
//       ignore: 'hostname,pid',
//     },
//   }
//   // pino.destination('./logs/logger.log')
// );
