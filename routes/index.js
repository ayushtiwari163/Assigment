'use strict';

const { Router } = require('express');
const validateApiKey = require('../middleware/api.auth')
const controller = require('../controller/index')
const schema = require('../schema/index')
const { validateQuery, validateBody } = require('../middleware/validator')
const router = Router();


/**
 * @description Route to Upload CSV
 */

router.post("/upload-csv",validateApiKey ,controller.uploadCSV);

router.get("/get-status",validateApiKey,validateQuery(schema.statusSchema), controller.getUploadCsvStatus);


module.exports = router
