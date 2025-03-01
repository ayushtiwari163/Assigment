'use strict';

const fs = require("fs");
const path = require("path");
const { drive } = require("../utils/google-drive");
const { googleDriveConfig } = require("../config");
const { Readable } = require("stream");

const uploadToGoogleDrive = async (filePathOrBuffer, fileName, isImage = true) => {
  try {
    let media;
    
    if (Buffer.isBuffer(filePathOrBuffer)) {
      media = {
        mimeType: "image/jpeg",
        body: Readable.from(filePathOrBuffer),
      };
    } else {
      media = {
        mimeType: "application/octet-stream",
        body: fs.createReadStream(filePathOrBuffer),
      };
    }
    let folder_id = googleDriveConfig.folder_id;
   if(isImage) folder_id = googleDriveConfig.image_folder_id;
    const fileMetadata = {
      name: fileName,
      parents: [googleDriveConfig.folder_id], 
    };

    const response = await drive.files.create({
      resource: fileMetadata,
      media,
      fields: "id, webViewLink",
    });

    console.log("✅ File uploaded:", response.data);
    return response.data.webViewLink;
  } catch (error) {
    console.error("❌ Error uploading to Google Drive:", error);
    throw error;
  }
};

module.exports = { uploadToGoogleDrive };
