const { Schema } = require(`mongoose`);

const subjectSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
      default: ``,
    },
    teachedBy: {
      type: Schema.Types.ObjectId,
      ref: `user`,
      required: true,
    },
    code: {
      type: String,
      minLength: 5,
      maxLength: 6,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

subjectSchema.pre(`save`, async function (next) {
  this.code = this.code.toUpperCase();
  next();
});

module.exports = subjectSchema;
