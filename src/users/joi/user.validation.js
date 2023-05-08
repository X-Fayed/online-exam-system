const joi = require(`joi`);

module.exports = {
  addUserSchema: {
    body: joi
      .object({
        firstName: joi.string().required(),
        lastName: joi.string().required(),
        email: joi
          .string()
          .email({ maxDomainSegments: 2, tlds: { allow: [`com`, `net`] } })
          .required(),
        password: joi.string().required(),
        role: joi.string().required().valid(`student`, `professor`, `admin`),
        department: joi.alternatives().conditional(`role`, {
          is: `student`,
          then: joi.string().required(),
        }),
        grade: joi.alternatives().conditional(`role`, {
          is: `student`,
          then: joi.number().required(),
        }),
      })
      .required(),
  },
  // updateStudentGradeSchema: {
  //   body: joi
  //     .object({
  //       grade: joi.number().required(),
  //     })
  //     .required(),
  // },
  // updateStudentDepartmentSchema: {
  //   body: joi
  //     .object({
  //       id: [
  //         joi
  //           .string()
  //           .regex(/^[0-9a-fA-F]{24}$/)
  //           .required(),
  //       ],
  //       department: joi.string().required(),
  //     })
  //     .required(),
  // },
  signInSchema: {
    body: joi
      .object({
        email: joi
          .string()
          .email({ maxDomainSegments: 2, tlds: { allow: [`com`, `net`] } })
          .required(),
        password: joi.string().required(),
      })
      .required(),
  },
};
