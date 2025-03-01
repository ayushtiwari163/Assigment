const { Pool } = require('pg');
const { psqlConfig } = require('../config');

const pool = new Pool({
  user: psqlConfig.user,
  host: psqlConfig.host,
  database: psqlConfig.database,
  password: psqlConfig.password,
  port: psqlConfig.port,
  max: psqlConfig.max_connections,
  connectionTimeoutMillis: 10 * 1000,
  idleTimeoutMillis: 2 * 60 * 1000,
  ssl: {
    rejectUnauthorized: false,
  }
});

module.exports = pool;
