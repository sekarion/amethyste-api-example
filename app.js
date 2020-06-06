const AmeBot = require('./structures/AmeBot');
const ameBot = new AmeBot();
const {inspect} = require('util');

process
  .on('unhandledRejection', (reason, promise) => {
    ameBot.log.error(
      `Unhandled Rejection at: ${inspect(promise)} reason: ${inspect(reason)}`
    );
  })
  .on('uncaughtException', (err, origin) => {
    ameBot.log.error(`Error: ${inspect(err)} at ${inspect(origin)}`);
  });
