"use strict";
const { success, failure } = require("../constant/status");
const upload = require("../utils/multer");
const service = require('../service/index')
const uploadCSV = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).send({
        message: err.message,
      });
    }
    try {
      console.log(req.body);
      const clientDetails = req.client;
      const webhool_url = req.body.webhook_url;
      console.log(webhool_url);
      const result = await service.uploadCSVService(req.file, clientDetails, webhool_url);
      if (result.is_error) {
        return res.status(result.statusCode).send({
          message: result?.message,
        });
      }
      return res.status(success.SUCCESS.statusCode).send(result);
    } catch (error) {
      res.status(500).json({ error: "INTERNAL_SERVER_ERROR" });
    }
  });
};

const getUploadCsvStatus = async(req, res) => {
    try{
        const clientDetails = req.client;
        const {request_id} = req.query;
        const result = await service.getUploadCsvStatus(request_id, clientDetails);
        if (result.is_error) {
            return res.status(result.statusCode).send({
              message: result?.message,
            });
          }
        return res.status(success.SUCCESS.statusCode).send(result);
 
    } catch(error){
        console.log(error);
        res.status(500).json({ error: "INTERNAL_SERVER_ERROR" });
    }

}


module.exports = {
  uploadCSV,
  getUploadCsvStatus
};
