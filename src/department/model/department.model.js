const mongoose = require("mongoose");
const departmentSchema = require("../schema/department.schema");

const Department = mongoose.model("department", departmentSchema);
module.exports = Department;