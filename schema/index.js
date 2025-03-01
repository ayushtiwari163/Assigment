const Joi = require("joi");


const statusSchema = Joi.object({
    request_id: Joi.string().max(50).required(),
});

const uploadCsvSchema = Joi.object({
    webhook_url: Joi.string().max(100).optional()
})

module.exports = {
    statusSchema,
    uploadCsvSchema
}