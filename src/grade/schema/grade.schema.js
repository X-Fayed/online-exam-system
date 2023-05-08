const { Schema } = require("mongoose");
const bcrypt = require("bcrypt");
const { StatusCodes } = require("http-status-codes");

const gradeSchema = new Schema(
  {
    gradeName: {
      type: String,
      required: [true, "grade name is required "],
      enum: ["one", "two","three","four","five","six","seven"]
    },
    departmentId:{
        type: String,
        required: [true, "type is required "],
        
    },
    
  },
  {
    timestamps: true,
  }
);
module.exports = gradeSchema;





