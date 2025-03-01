const Queue = require("bull");
const {redisConfig} = require('../config')
const redisOptions = {
    redis: {
      host: redisConfig.host,
      port: redisConfig.port,
      password: redisConfig.auth_pass || undefined, 
    },
  };

const csvProcessingQueue = new Queue("csvProcessingQueue", redisOptions);

module.exports = { csvProcessingQueue };
