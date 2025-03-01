'use strict'

const fs = require("fs");
const { drive } = require("../utils/google-drive");
const getDriveFileId = (driveLink) => {
    const regex = /\/d\/([a-zA-Z0-9_-]+)\//;
    const match = driveLink.match(regex);
    return match ? match[1] : null;
};
const downloadFileFromDrive = async (driveLink, destinationPath) => {
    try {
        const fileId = getDriveFileId(driveLink); 
        if (!fileId) throw new Error('Invalid Google Drive link');

        const dest = fs.createWriteStream(destinationPath);
        const response = await drive.files.get(
            { fileId, alt: 'media' },
            { responseType: 'stream' }
        );

        return new Promise((resolve, reject) => {
            response.data
                .on('end', () => {
                    console.log(`File downloaded successfully: ${destinationPath}`);
                    resolve(destinationPath);
                })
                .on('error', (err) => {
                    console.error('Error downloading file:', err);
                    reject(err);
                })
                .pipe(dest);
        });

    } catch (error) {
        console.error('Google Drive download error:', error.message);
        throw error;
    }
};

module.exports = { downloadFileFromDrive };
