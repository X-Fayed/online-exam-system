const mongoose = require(`mongoose`);
const subjectSchema = require("../schema/subject.schema");

const subject = mongoose.model(`subject`, subjectSchema);

module.exports = subject;
