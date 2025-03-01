'use strict'

const path = require("path");
const fs = require("fs-extra");
const { v4: uuidv4 } = require("uuid");
const {uploadToGoogleDrive} = require('./upload-csv')
const model = require('../model/index')
const queries = require('../model/queries')
const { csvProcessingQueue } = require("../utils/bull");

const uploadCSVService = async(file, clientDetails, webhookUrl) => {
    if (!file) throw new Error("No file uploaded");
    const requestId = uuidv4();
    const filePath = file.path;
    const fileName = file.filename;
    const driveResponse = await uploadToGoogleDrive(filePath, fileName, false);
    const driveLink = driveResponse;
    await model.pgInsert(queries.csvRequestQueries.INSERT_CSV_REQUEST, [requestId, fileName, driveLink, "PENDING", clientDetails.client_id]);

    csvProcessingQueue.add("processCSV", { requestId, driveLink, webhookUrl });
    fs.unlinkSync(filePath);
    return {is_error: false, request_id: requestId };

}
const getUploadCsvStatus = async(requestId, clientDetails) => {
    const result = await model.pgGetOneRow(queries.csvRequestQueries.GET_CSV_STATUS, [requestId, clientDetails.client_id]);
    if(!result){
        return {is_error: true, statusCode: 400, message: `Request Id '${requestId}' is not Valid`};
    }
    const { status, drive_link } = result;
    if(status === 'COMPLETED'){
        return {is_error: false,status, result: drive_link};
    }
    return {is_error: false, status}
}

module.exports = {
    uploadCSVService,
    getUploadCsvStatus
}