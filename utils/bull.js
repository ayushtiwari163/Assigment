const Queue = require("bull");
const {redisConfig} = require('../config')
const redisOptions = {
  connection: { host: redisConfig.host, port: redisConfig.port },
};

const csvProcessingQueue = new Queue("csvProcessingQueue", redisOptions);

module.exports = { csvProcessingQueue };
