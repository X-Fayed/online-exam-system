const User = require(`../model/user.model`);
const { StatusCodes } = require(`http-status-codes`);
const bcrypt = require(`bcrypt`);
const jwt = require(`jsonwebtoken`);
const { sendEmail } = require("../../../common/service/sendEmail");
const Exam = require("../../exam/model/exam.model");
const Question = require("../../questions/model/question.model");


exports.addNewUserHandler = async (req, res) => {
  let { firstName, lastName, email, password, department, grade, role } =
    req.body;
  try {
    let exist = await User.findOne({ email });
    if (!exist) {
      const user = await User.create({
        firstName,
        lastName,
        email,
        password,
        department,
        grade,
        role,
      });
      res
        .status(StatusCodes.CREATED)
        .json({ message: `Create Success`, data: user });
    } else {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: `Email already exist` });
    }
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: `Internal Server Error`, error });
    console.log(error);
  }
};

exports.getAllUsersHandler = async (req, res) => {
  try {
    let users = await User.find({});
    res.status(StatusCodes.OK).json({ message: `Success`, data: users });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: `INTERNAL SERVER ERROR`, error });
  }
};

exports.deleteUserHandler = async (req, res) => {
  let { id } = req.params;
  try {
    if (id.match(/^[0-9a-fA-F]{24}$/)){
    const exam =await Exam.find({profId: id});
    if(exam){
      for(let i = 0 ;i<exam.length;i++){
        const deletedQuestions =await Question.deleteMany({examId : exam[0]._id});
      }
      let deletedExam = await Exam.deleteMany({ profId: id });
    }
    let deleted = await User.deleteOne({ _id: id });
    if (deleted.deletedCount > 0) {
      res.status(StatusCodes.OK).json({ message: `Delete Success` });
    } else {
      res.status(StatusCodes.BAD_REQUEST).json({ message: `User not Found` });
    }
  }
  else{
    res.status(StatusCodes.BAD_REQUEST).json({ message: `Invalid Id` });
  }
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: `Internal Server Error`, error });
  }
};

exports.updateUserHandler = async (req, res) => {
  let { id, department, grade, approvedStatus } = req.body;
  try {
    const data = await User.updateMany(
      { _id: id },
      {
        $set: {
          department: department,
          grade: grade,
          approvedStatus: approvedStatus,
        },
      }
    );
    if (data.modifiedCount > 0) {
      res.status(StatusCodes.OK).json({ message: `Update Success` });
    } else {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: `PLEASE ENTER A VALID ID/s` });
    }
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: `INTERNAL SERVER ERROR`, error });
    console.log(error);
  }
};

exports.signInHandler = async (req, res) => {
  let { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) {
      res.status(StatusCodes.BAD_REQUEST).json({ message: `No such email` });
    } else {
      let match = await bcrypt.compare(password, user.password);
      if (match) {
        //login
        let token = jwt.sign(
          { id: user._id, role: user.role, approved: user.approvedStatus },
          process.env.SECRET_KEY,
          {
            expiresIn: process.env.EXPIRATION_TIME,
          }
        );
        let withoutPasswd = await User.findOne({ email }).select(`-password`);
        res
          .status(StatusCodes.OK)
          .json({ message: `LOGIN SUCCESS`, token, data: withoutPasswd });
      } else {
        res
          .status(StatusCodes.BAD_REQUEST)
          .json({ message: `Password is invalid` });
      }
    }
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: `INTERNAL SERVER ERROR`, error });
  }
};
