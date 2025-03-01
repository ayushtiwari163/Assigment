'use strict';

const redis = require('redis');
const { redisConfig } = require('../config');
const client = redis.createClient(redisConfig);

client.on('connect', () => {
  console.log('Connected to Redis.');
});

client.on('error', (error) => {
  console.log(`Redis Error: ${error}`);
});

module.exports = client;
