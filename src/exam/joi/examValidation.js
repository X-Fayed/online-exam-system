const Joi = require("joi");

module.exports = {
  examSchema: {
    body: Joi.object().required().keys({
      exam_date: Joi.date().required(),
      time: Joi.number().required(),
      subId: Joi.string().required(),
      profId: Joi.string().required(),
    }),
    file: Joi.object().required(),
  },

};
