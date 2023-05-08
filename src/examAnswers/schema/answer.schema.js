const { Schema } = require("mongoose");
const answerSchema = new Schema(
  {
    answers: {
      type:[],
      required: [true, "answers is required "],
    },
    degree:{
      type: Number,
      required: [true, "degree is required "],
        
    },
    studentId :{
      type: Schema.Types.ObjectId, ref: "user",
      required: [true, "student Id is required "],
  },
  subjectId :{
    type: Schema.Types.ObjectId, ref: "subject",
    required: [true, "subject Id is required "],
},
  },
  {
    timestamps: true,
  }
);

module.exports = answerSchema;





