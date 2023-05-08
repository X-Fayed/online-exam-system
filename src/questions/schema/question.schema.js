const { Schema } = require("mongoose");
const bcrypt = require("bcrypt");

const questionSchema = new Schema(
  {
    question: {
      type: String,
      required: [true, "question is required "],
    },
    type:{
        type: String,
        required: [true, "type is required "],
        enum: ["MCQ", "T&F"]
        
    },
    choices:{
        type: [],
        required: [true, "choices is required "],
        
    },
    answer :{
        type: String,
        required: [true, "answer is required "],
    },
    examId :{
      type: Schema.Types.ObjectId,
      required: [true, "exam Id is required "],
  },
  },
  {
    timestamps: true,
  }
);

module.exports = questionSchema;





