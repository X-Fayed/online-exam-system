const { StatusCodes } = require("http-status-codes");
const Question = require("../model/question.model");

const getAllQuestionHandelr = async (req, res) => {
  const { id } = req.params;
  
  try {
    if (id) {
      const data = await Question.findOne({ _id: id });
      if (data) {
        res.json({ message: "success", data });
      } else {
        res.json({ message: "invalid question id" });
      }
    } else {
      const data = await Question.find({});
      res.json({ message: "success", data });
    }
  } catch (error) {
    res.json({ message: "Error in get all questions", error });
  }
};

const updateQuestionHandelr = async (req, res) => {
  const { id } = req.params;
  const { question,type,choices,answer,examId } = req.body;
  try {
    if (id.match(/^[0-9a-fA-F]{24}$/)){
      const data = await Question.updateOne({ _id: id }, {question,type,choices,answer,examId});
      if (data.modifiedCount) {
        res.status(StatusCodes.OK).json({ message: `Updated success` });
      }
      else{
        res
            .status(StatusCodes.BAD_REQUEST)
            .json({ message: `Question not found` });
      }
    }
    else{
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "invalid id"});
    }
  
  } catch (error) {
    res.json({ message: "update question error", error });
  }
};




const addNewQuestionHandelr = async (req, res) => {
  const { question,type,choices,answer,examId	} =req.body;

  try {
    
      const newquestion = new Question({
        question,
        type,
        choices,
        answer,
        examId,
      });
      const data = await newquestion.save();
      res
        .status(StatusCodes.CREATED)
        .json({ message: "created success", data });
      
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "add question error", error });
  }
};

const deleteQuestionHandelr = async (req, res) => {
  const { id } = req.params;
  try {
    if (id.match(/^[0-9a-fA-F]{24}$/)){
      const data = await Question.deleteOne({ _id: id });
    if (data.deletedCount) {
      res.json({ message: "deleted success", data: id });
    } else {
      res.json({ message: "invalid question id ", data });
    }
    }
    else{
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "invalid id"});
    }
    
  } catch (error) {
    res.json({ message: "delete question error", error });
  }
};

module.exports = {
  getAllQuestionHandelr,
  addNewQuestionHandelr,
  updateQuestionHandelr,
  deleteQuestionHandelr,
};
