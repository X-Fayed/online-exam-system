const adminPolicy = require(`../policy/admin.policy`);
const professorPolicy = require(`../policy/professor.policy`);
const studentPolicy = require(`../policy/student.policy`);
const roles = require(`../../enum/roles`);

const opt = {
  [roles.ADMIN]: {
    can: adminPolicy,
  },
  [roles.PROFESSOR]: {
    can: professorPolicy,
  },
  [roles.STUDENT]: {
    can: studentPolicy,
  },
};

module.exports = opt;
