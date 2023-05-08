const { Schema } = require("mongoose");
const bcrypt = require("bcrypt");

const departmentSchema = new Schema(
  {
    departmentName: {
      type: String,
      required: [true, "department naame is required "],
    },
  },
  {
    timestamps: true,
  }
);


module.exports = departmentSchema;





