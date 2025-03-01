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
        auth_pass: process.env.REDIS_AUTH_PASSWORD,
        prefix: "assignment" 

    },
    fileSizeLimit: parseInt(process.env.FILE_SIZE_LIMIT, 10),
    googleDriveConfig: {
       client_id: process.env.GOOGLE_CLIENT_ID,
       project_id: process.env.GOOGLE_PROJECT_ID,
       client_secret: process.env.GOOGLE_CLIENT_SECRET,
       redirect_uris: process.env.GOOGLE_REDIRECT_URL,
       refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
       folder_id:  process.env.GOOGLE_FOLDER_ID,
       image_folder_id: process.env.IMAGE_FOLDER_ID
    }
}