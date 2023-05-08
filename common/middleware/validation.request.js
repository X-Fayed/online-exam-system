const { StatusCodes } = require(`http-status-codes`);

module.exports = (schema) => {
  return (req, res, next) => {
    let validationErrors = [];
    let validationResults = schema.body.validate(req.body);
    if (validationResults.error) {
      validationErrors.push(validationResults.error.details[0].message);
    }
    if (validationErrors.length) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: `error`, data: validationErrors });
    } else {
      next();
    }
  };
};


