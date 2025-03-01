'use strict'
const multer = require("multer");
const fs = require("fs-extra");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const fileSizeLimit = require('../config')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, "../uploads");
    fs.ensureDirSync(uploadDir);
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${uuidv4()}_${file.originalname}`);
  },
});

const fileFilter = (req, file, cb) => {
  if (!file.originalname.endsWith(".csv")) {
    return cb(new Error("Only CSV files are allowed"), false);
  }
  cb(null, true);
};

const upload = multer({
  storage,
  limits: { fileSize: fileSizeLimit }, // 2MB limit
  fileFilter,
}).single("file");


module.exports = upload;
