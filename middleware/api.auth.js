'use strict'
const strings = require('../constant/strings')
const {failure} = require('../constant/status')
const { findClientByApiKey } = require('../model/index')
const validateApiKey = async (req, res, next) => {
    try{
        const apiKeyHeader = req.headers['authorization'];
        if (!apiKeyHeader) {
            return res.status(failure.UNAUTHORIZED.statusCode).json({error: strings.unauthorized, message: strings.authHeaderMissingMessage});
        }
        const client = await findClientByApiKey(apiKeyHeader);
        if (!client) {
            return res.status(failure.UNAUTHORIZED.statusCode).json({error: strings.unauthorized, message: strings.inValidApiKeyMessage});
        }
        req.client = client;
        next();
    } catch(err){
         console.log(err);
         res.status(failure.INTERNAL_SERVER_ERROR.statusCode).json({message: failure.INTERNAL_SERVER_ERROR.message });
    }
}

module.exports = validateApiKey