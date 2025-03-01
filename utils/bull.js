const Queue = require("bull");
const {redisConfig} = require('../config')
const redisOptions = {
  connection: { host: redisConfig.host, port: redisConfig.port, auth_pass: redisConfig.auth_pass },
};

const csvProcessingQueue = new Queue("csvProcessingQueue", redisOptions);

module.exports = { csvProcessingQueue };
