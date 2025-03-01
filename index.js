'use strict';
const setTZ = require('set-tz');
setTZ('Asia/Calcutta');
const express = require('express');
const cors = require('cors');
const compression = require('compression');
const httpStatus = require('http-status');
const bodyParser = require('body-parser');
const { webConfig } = require('./config')
const routes = require('./routes')
const checkMaintenanceMode = require('./middleware/maintenance.middleware');

const app = express();
app.use(cors());
app.use(compression());
app.use(bodyParser.json({ limit: '500kb' }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/ping', (req, res) => res.sendStatus(httpStatus.OK));
app.use(checkMaintenanceMode);
app.use('/api', routes);


const server = app.listen(webConfig.port, () => console.log(`Enviornment running on port ${webConfig.port}`));
server.keepAliveTimeout = 65000;
server.headersTimeout = 66000;



