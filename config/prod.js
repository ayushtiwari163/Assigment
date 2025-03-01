'use strict'
module.exports = {
    psqlConfig: {
        host: process.env.PSQL_HOST,
        port: parseInt(process.env.PSQL_PORT, 10),
        database: process.env.PSQL_DATABASE,
        user: process.env.PSQL_USER,
        password: process.env.PSQL_PASSWORD,
        max_connections: parseInt(process.env.PSQL_MAX_CONNECTIONS, 10),
    },
    webConfig: {
        port: parseInt(process.env.WEB_PORT, 10)
    },
    isMaintenance: parseInt(process.env.IS_MAINTENANCE, 10),
    redisConfig: {
        host: process.env.REDIS_HOST,
        port: parseInt(process.env.REDIS_PORT, 10),
        redisExpTime: parseInt(process.env.REDIS_EXP_TIME, 10),
        redisExpTimeForSession: parseInt(process.env.REDIS_EXP_TIME_FOR_SESSION, 10),
        prefix: "assignment" 

    }
}