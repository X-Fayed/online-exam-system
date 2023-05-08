const Subject = require(`../model/subject.model`);
const User = require(`../../users/model/user.model`);
const { StatusCodes } = require(`http-status-codes`);

exports.addSubjectHandler = async (req, res) => {
  let { title, description, teachedBy, code } = req.body;
  try {
    let existed = await Subject.findOne({ code });
    if (!existed) {
      let subject = await Subject.create({
        title,
        description,
        teachedBy,
        code,
      });
      res
        .status(StatusCodes.OK)
        .json({ message: `ADD SUCCESS`, data: subject });
    } else {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: `ADD FAILED`, data: `Subject already exists` });
    }
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: `INTERNAL SERVER ERROR`, data: error });
  }
};

exports.getSubjectsHandler = async (req, res) => {
  let { id } = req.params;
  try {
    let user = await User.findOne({ _id: id });
    if (user && user.role == `professor`) {
      let subjects = await Subject.find({ teachedBy: id }).select(`-teachedBy`);
      res.status(StatusCodes.OK).json({ message: `SUCCESS`, data: subjects });
    } else if (user && user.role == `admin`) {
      let subjects = await Subject.find({}).populate(
        `teachedBy`,
        `firstName lastName email`
      );
      res.status(StatusCodes.OK).json({ message: `SUCCESS`, data: subjects });
    } else {
      res.status(StatusCodes.BAD_REQUEST).json({ message: `NOT AUTHORIZED` });
    }
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: `INTERNAL SERVER ERROR`, data: error });
  }
};

exports.deleteSubjectHandler = async (req, res) => {
  let { id } = req.params;
  try {
    let subject = await Subject.deleteOne({ _id: id });
    if (subject.deletedCount > 0) {
      res
        .status(StatusCodes.OK)
        .json({ message: `SUCCESS`, data: `Subject deleted` });
    } else {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: `FAIL`, data: `SUBJECT NOT FOUND` });
    }
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: `INTERNAL SERVER ERROR`, data: error });
  }
};

exports.updateSubjectHandler = async (req, res) => {
  let { id } = req.params;
  let { title, description, code, teachedBy } = req.body;
  try {
    let subject = await Subject.updateOne(
      { _id: id },
      {
        title,
        description,
        code,
        teachedBy,
      }
    );
    if (subject.modifiedCount > 0) {
      res.status(StatusCodes.OK).json({ message: `UPDATE SUCCESS` });
    } else {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: `SUBJECT NOT FOUND` });
    }
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: `INTERNAL SERVER ERROR`, data: error });
  }
};
