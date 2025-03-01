'use strict';
const strings = require('../constant/strings')
const { isMaintenance } = require('../config');

const checkMaintenanceMode = (req, res, next) => {
  if (parseInt(isMaintenance) === 1) {
    return res.status(503).json({ error: strings.serviceUnavailableError, message: strings.serviceUnavailableMessage });
  }
  next();
};

module.exports = checkMaintenanceMode;