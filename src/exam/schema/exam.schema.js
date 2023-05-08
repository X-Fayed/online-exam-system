const { Schema } = require("mongoose");

const examSchema = new Schema(
  {
    exam_date: {
      type: String,
      required: [true, "email is required "],
    },
    time:{
        type: Number,
        required: [true, "time is required "],
    },
    subId:{
        type: Schema.Types.ObjectId,ref: "subject",
        required: [true, "subject id is required "],
    },
    profId :{
        type: Schema.Types.ObjectId, ref: "user",
        required: [true, "subject id is required "],
    },
  },
  {
    timestamps: true,
  }
);


module.exports = examSchema;





