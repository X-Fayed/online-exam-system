const mongoose= require('mongoose');
const questionSchema = require('../schema/question.schema');

const Question = mongoose.model("quetion",questionSchema);
module.exports = Question;