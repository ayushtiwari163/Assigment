# Image Processing Service

## Setup Instructions

### 1. Configure Environment Variables
Before running the service, ensure you have the necessary environment variables configured in `config/dev.js`. The required configurations include:

```js
module.exports = {
  redisConfig: {
    host: "your-redis-host",
    port: your-redis-port,
    password: "your-redis-password" // If applicable
  },
  
  psqlConfig: {
    user: "your-db-user",
    host: "your-db-host",
    database: "your-db-name",
    password: "your-db-password",
    port: your-db-port
  },
  
  googleDriveConfig: {
    clientId: "your-google-drive-client-id",
    clientSecret: "your-google-drive-client-secret",
    refreshToken: "your-google-drive-refresh-token",
    folder_id: "your-google-drive-folder-id"
  }
};
```

### 2. Install Dependencies
Run the following command to install all required dependencies:
```sh
npm install
```

### 3. Start the Service
To start the service, run:
```sh
npm start
```

The service will now be running and ready to process CSV files with images asynchronously.

