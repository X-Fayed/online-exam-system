const Joi = require("joi");

Joi.objectId = require("joi-objectid")(Joi);
module.exports = {
  gradeSchema: {
    body: Joi.object().required().keys({
      
      gradeName: Joi.string().required(),
      departmentId: Joi
      .string()
      .regex(/^[0-9a-fA-F]{24}$/)
      .required(),
    }),
    
  },

  
};

 
