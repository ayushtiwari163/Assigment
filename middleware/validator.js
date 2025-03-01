'use strict';

const httpStatus = require('http-status');

function validateBody(schema) {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      const { details } = error;
      const message = details.map(i => i.message).join(',');
      return res.status(httpStatus.BAD_REQUEST).json({ message });
    }
    return next();
  };
};

function validateQuery(schema) {
  return (req, res, next) => {
    const { error } = schema.validate(req.query);
    if (error) {
      const { details } = error;
      const message = details.map(i => i.message).join(',');
      return res.status(httpStatus.BAD_REQUEST).json({ message });
    }
    return next();
  };
};

module.exports = {
  validateBody,
  validateQuery
}