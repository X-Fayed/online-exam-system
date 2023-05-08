const { StatusCodes } = require("http-status-codes");
const Exam = require("../model/exam.model");
const Question = require("../../questions/model/question.model");


const getAllExamHandelr = async (req, res) => {
  try {
    let examArr = [];
    const cursor = Exam.find({}).populate("profId").populate("subId").cursor();
    for (
      let doc = await cursor.next();
      doc != null;
      doc = await cursor.next()
    ) {
      const questions = await Question.find({ examId: doc._id });
      const obj = { ...doc._doc, questions };
      examArr.push(obj);
    }
    res.json({ message: "success", examArr });

  } catch (error) {
    res.json({ message: "Error in get all exams", error });
  }
};

const updateExamHandelr = async (req, res) => {
  const { id } = req.params;
  const { exam_date,time,subId,profId } = req.body;
  try {
    if (id.match(/^[0-9a-fA-F]{24}$/)){
      const data = await Exam.updateOne({ _id: id }, { exam_date,time,subId,profId });
      if (data.modifiedCount) {
        res.status(StatusCodes.OK).json({ message: `Updated success` });
      }
      else{
        res
            .status(StatusCodes.BAD_REQUEST)
            .json({ message: `Exam not found` });
      }
    }
    else{
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "invalid id"});
    }
    
  } catch (error) {
    res.json({ message: "update exam error", error });
  }
};

const addNewExamHandelr = async (req, res) => {
  const { exam_date,time,subId,profId} =req.body;

  try {
      const newExam = new Exam({
        exam_date,
        time,
        subId,
        profId,
      });
      const data = await newExam.save();
      res
        .status(StatusCodes.CREATED)
        .json({ message: "created success", data });
 
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "add exam error", error });
  }
};

const deleteExamHandelr = async (req, res) => {
  const { id } = req.params;
  try {
    if (id.match(/^[0-9a-fA-F]{24}$/)){
      const question1 =await Question.deleteMany({examId:id});
    const data = await Exam.deleteOne({ _id: id });
    
    if (data.deletedCount) {
      res.json({ message: "deleted success", data: id});
    } else {
      res.json({ message: "invalid exam id ", data });
    }
    }
    else{
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "invalid id"});
    }
    
  } catch (error) {
    res.json({ message: "delete exam error in catch", error });
  }
};

module.exports = {
  getAllExamHandelr,
  addNewExamHandelr,
  updateExamHandelr,
  deleteExamHandelr,
};
