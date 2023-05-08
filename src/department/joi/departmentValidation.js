const Joi = require("joi");

module.exports = {
  departmentSchema: {
    body: Joi.object().required().keys({
      departmentName: Joi.string().required(),
    }),
  },
};
