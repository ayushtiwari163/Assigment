const { google } = require("googleapis");
const { googleDriveConfig } = require("../config")


const oauth2Client = new google.auth.OAuth2(
  googleDriveConfig.client_id,
  googleDriveConfig.client_secret,
  googleDriveConfig.redirect_uris
);

// Set Refresh Token
oauth2Client.setCredentials({
  refresh_token: googleDriveConfig.refresh_token,
});

// Google Drive API Instance
const drive = google.drive({ version: "v3", auth: oauth2Client });

module.exports = { drive };
