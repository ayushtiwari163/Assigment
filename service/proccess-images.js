'use strict'
const fs = require("fs");
const path = require("path");
const axios = require("axios");
const csvParser = require("csv-parser");
const sharp = require("sharp");
const { v4: uuidv4 } = require("uuid");
const { uploadToGoogleDrive } = require("./upload-csv");
const { downloadFileFromDrive } = require('./download-csv')
const model = require("../model/index");
const queries = require("../model/queries");
const callWebhook = require("../service/webhook")
const processImages = async (job) => {
    let finalStatus = '';
    const { requestId, driveLink, webhookUrl } = job.data;
    console.log(job.data);
    let resultDriveUrl = '';
    console.log(`🔄 Processing CSV for Request ID: ${requestId}`);

    const tempCsvPath = `temp_${requestId}.csv`;
    const outputCsvPath = `output_${requestId}.csv`;
    try {

        const csvPath = await downloadFileFromDrive(driveLink, tempCsvPath);
        console.log(`📥 CSV downloaded: ${csvPath}`);

        const inputRows = [];
        const invalidRows = [];
        await new Promise((resolve, reject) => {
            fs.createReadStream(csvPath)
                .pipe(csvParser())
                .on("data", (row) => {
                    const { "S. No.": serialNo, "Product Name": productName, "Input Image Urls": imageUrls } = row;
                    if (!serialNo || isNaN(serialNo) || !productName || !imageUrls) {
                        invalidRows.push(row);
                    } else {
                        inputRows.push({ serialNo, productName, imageUrls: imageUrls.split(",") });
                    }
                })
                .on("end", resolve)
                .on("error", reject);
        });

        if (invalidRows.length > 0) {
            console.log("❌ Invalid CSV format detected");
            finalStatus = 'VALIDATION_FAILED'
            await model.pgInsert(queries.csvRequestQueries.UPDATE_CSV_STATUS, ["VALIDATION_FAILED", requestId]);
            return;
        }

        console.log(`✅ CSV Validation Passed: ${inputRows.length} valid rows`);

        const processedRows = [];
        for (const row of inputRows) {
            const compressedUrls = [];
            for (const imageUrl of row.imageUrls) {
                try {
                    const imageBuffer = await downloadImage(imageUrl);
                    const compressedBuffer = await compressImage(imageBuffer);
                    const imageFileName = `compressed_${uuidv4()}.jpg`;
                    const driveUrl = await uploadToGoogleDrive(compressedBuffer, imageFileName);
                    compressedUrls.push(driveUrl);
                } catch (err) {
                    console.error(`❌ Error processing image: ${imageUrl}`, err.message);
                    compressedUrls.push("ERROR_PROCESSING_IMAGE");
                }
            }
            processedRows.push({ ...row, outputUrls: compressedUrls.join(",") });
        }

        // Step 4: Create output CSV
        const outputCsvPath = `output_${requestId}.csv`;
        const csvContent = generateCsvContent(processedRows);
        fs.writeFileSync(outputCsvPath, csvContent);

        resultDriveUrl = await uploadToGoogleDrive(outputCsvPath, `Processed_${requestId}.csv`);
        console.log(`📤 Processed CSV uploaded: ${resultDriveUrl}`);

        await model.pgInsert(queries.csvRequestQueries.UPDATE_CSV_RESULT, [resultDriveUrl, "COMPLETED", requestId]);

        console.log(`✅ Processing completed for Request ID: ${requestId}`);
        finalStatus = "COMPLETED";

    } catch (error) {
        finalStatus = 'FAILED'
        console.error("❌ Error in processImages:", error);
    } finally {
        try {
            if (fs.existsSync(tempCsvPath)) fs.unlinkSync(tempCsvPath);
            if (fs.existsSync(outputCsvPath)) fs.unlinkSync(outputCsvPath);
            console.log(`🗑️ Deleted temporary files for Request ID: ${requestId}`);
        } catch (cleanupError) {
            console.error("⚠️ Error cleaning up files:", cleanupError.message);
        }
        if (webhookUrl) {
            await callWebhook(webhookUrl, {
                request_id: job.data.requestId,
                finalStatus,
                ...(finalStatus === "COMPLETED" && { drive_link: resultDriveUrl }) 
            });
        }

    }
};

const downloadImage = async (url) => {
    const response = await axios.get(url, { responseType: "arraybuffer" });
    return Buffer.from(response.data, "binary");
};

const compressImage = async (buffer) => {
    return await sharp(buffer).jpeg({ quality: 50 }).toBuffer();
};

const generateCsvContent = (rows) => {
    let csv = "S. No.,Product Name,Input Image Urls,Output Image Urls\n";
    rows.forEach((row) => {
        csv += `${row.serialNo},${row.productName},"${row.imageUrls.join(",")}","${row.outputUrls}"\n`;
    });
    return csv;
};

module.exports = { processImages };
