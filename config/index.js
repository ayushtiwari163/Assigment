'use strict';
const env = process.env.ENVIRONMENT || 'development';

const config = (env === 'production') ? require('./prod') : require('./my-dev');

module.exports = {
    ...config,
    environment: env
};