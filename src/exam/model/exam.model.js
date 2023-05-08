const mongoose= require('mongoose');
const examSchema = require('../schema/exam.schema');

const Exam = mongoose.model("exam",examSchema);
module.exports = Exam;