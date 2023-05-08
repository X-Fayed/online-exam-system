const { Schema } = require(`mongoose`);
const bcrypt = require(`bcrypt`);

const userSchema = new Schema(
  {
    email: { type: String, required: true },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: [`admin`, `professor`, `student`],
      default: `Student`,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    grade: {
      type: Number,
      required: function () {
        return this.role == `student`;
      },
    },
    department: {
      type: String,
      required: function () {
        return this.role == `student`;
      },
    },
    approvedStatus: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

//hocks
userSchema.pre(`save`, async function (next) {
  this.password = await bcrypt.hash(this.password, 7);
  next();
});

module.exports = userSchema;
