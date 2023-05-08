const RBAC = require(`easy-rbac`);
const opt = require("./policy");
let rbac = RBAC.create(opt);

module.exports = rbac;
