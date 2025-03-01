'use strict'

module.exports = {
    psqlConfig: {
        host: 'localhost',
        port: 5432,
        database: '',
        user: 'postgres',
        password: '',
        max_connections: 500,
    },
    webConfig: {
        port: 3000
    },
    isMaintenance: 0,
    redisConfig: {
        host: '127.0.0.1',
        port: 6379,
        redisExpTime: 86400 * 60 * 24,
        redisExpTimeForSession: 3600 *1000,
        prefix: "assignment" // 5184000 //1hrs
    },
    apiKey: "Dev_API_KEY",
    fileSizeLimit: 2 * 1024 * 1024,
    googleDriveConfig: {
       client_id: "",
       project_id: "",
       client_secret: "",
       redirect_uris: "",
       refresh_token: "",
       folder_id: '',
       image_folder_id: ''
    }
}