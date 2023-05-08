const { StatusCodes } = require("http-status-codes");
const Answer = require("../model/answer.model");

const getAllAnswerHandelr = async (req, res) => {
  const { id } = req.params;
  
  try {
    if (id) {
      const data = await Answer.find({ studentId: id }).populate("studentId").populate("subjectId");
      if (data) {
        res.json({ message: "success", data });
      } else {
        res.json({ message: "invalid answer id" });
      }
    } 
  } catch (error) {
    res.json({ message: "Error in get all answers", error });
  }
};
/*
const updateAnswerHandelr = async (req, res) => {
  const { id } = req.params;
  const { answers,degree,studentId,subjectId } = req.body;
  try {
    if (id.match(/^[0-9a-fA-F]{24}$/)){
      const data = await Answer.updateOne({ _id: id }, {answers,degree,studentId,subjectId});
      if (data.modifiedCount) {
        res.status(StatusCodes.OK).json({ message: `Updated success` });
      }
      else{
        res
            .status(StatusCodes.BAD_REQUEST)
            .json({ message: `Answer not found` });
      }
    }
    else{
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "invalid id"});
    }
  
  } catch (error) {
    res.json({ message: "update answer error", error });
  }
};
*/



const addNewAnswerHandelr = async (req, res) => {
  const { answers,degree,studentId,subjectId	} =req.body;

  try {
    
      const newanswer = new Answer({
        answers,
        degree,
        studentId,
        subjectId,
      });
      const data = await newanswer.save();
      res
        .status(StatusCodes.CREATED)
        .json({ message: "created success", data });
      
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "add answer error", error });
  }
};
/*
const deleteAnswerHandelr = async (req, res) => {
  const { id } = req.params;
  try {
    if (id.match(/^[0-9a-fA-F]{24}$/)){
      const data = await Answer.deleteOne({ _id: id });
    if (data.deletedCount) {
      res.json({ message: "deleted success", data: id });
    } else {
      res.json({ message: "invalid answer id ", data });
    }
    }
    else{
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "invalid id"});
    }
    
  } catch (error) {
    res.json({ message: "delete answer error", error });
  }
};
*/
module.exports = {
  getAllAnswerHandelr,
  addNewAnswerHandelr,
  /*
  updateAnswerHandelr,
  deleteAnswerHandelr,
  */
};
