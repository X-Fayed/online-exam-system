const mongoose= require('mongoose');
const answerSchema = require('../schema/answer.schema');

const Answer = mongoose.model("answer",answerSchema);
module.exports = Answer;