const joi = require(`joi`);

module.exports = {
  addSubjectSchema: {
    body: joi
      .object({
        title: joi.string().required(),
        description: joi.string().required(),
        teachedBy: joi
          .string()
          .regex(/^[0-9a-fA-F]{24}$/)
          .required(),
        code: joi
          .string()
          .regex(/\b[A-Za-z]{2,3}\d{3}\b/)
          .required(),
      })
      .required(),
  },
};
