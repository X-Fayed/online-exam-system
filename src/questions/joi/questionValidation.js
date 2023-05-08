const Joi = require("joi");

module.exports = {
  questionSchema: {
    body: Joi.object().required().keys({
      question: Joi.string().required(),
      type: Joi.string().required(),
      choices: Joi.array().required().min(2).max(4),
      answer: Joi.string().required(),
      examId: Joi.string().required(),
    }),
    file: Joi.object().required(),
  },
  
};

 
