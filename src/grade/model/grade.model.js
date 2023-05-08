const mongoose= require('mongoose');
const gradeSchema = require('../schema/grade.schema');

const Grade = mongoose.model("grade",gradeSchema);
module.exports = Grade;