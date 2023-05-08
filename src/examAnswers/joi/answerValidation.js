const Joi = require("joi");

module.exports = {
  answerSchema: {
    body: Joi.object().required().keys({
      answers: Joi.array().required(),
      degree: Joi.number().required(),
      subjectId: Joi.string()
      .regex(/^[0-9a-fA-F]{24}$/)
      .required(),
      studentId: Joi.string()
      .regex(/^[0-9a-fA-F]{24}$/)
      .required(),
    }),

  },
  
};

