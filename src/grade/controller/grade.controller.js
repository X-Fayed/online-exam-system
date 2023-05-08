const { StatusCodes } = require("http-status-codes");
const Grade = require("../model/grade.model");

const getAllGradeHandelr = async (req, res) => {
  const { id } = req.params;
  
  try {
    if (id) {
      const data = await Grade.findOne({ _id: id });
      if (data) {
        res.json({ message: "success", data });
      } else {
        res.json({ message: "invalid Grade id" });
      }
    } else {
      const data = await Grade.find({});
      res.json({ message: "success", data });
    }
  } catch (error) {
    res.json({ message: "Error in get all Grade", error });
  }
};

const updateGradeHandelr = async (req, res) => {
  const { id } = req.params;
  const { gradeName,departmentId } = req.body;
  try {
    if (id.match(/^[0-9a-fA-F]{24}$/)){
      const grade = await Grade.updateOne({ _id: id }, { gradeName,departmentId });
      if (grade.modifiedCount) {
        res.status(StatusCodes.OK).json({ message: `Updated success` });
      }
      else{
        res
            .status(StatusCodes.BAD_REQUEST)
            .json({ message: `Grade not found` });
      }
    }
    else{
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "invalid id"});
    }
    
      }
    
   catch (error) {
    res.json({ message: "update Grade error", error });
  }
};




const addNewGradeHandelr = async (req, res) => {
  const { gradeName,departmentId	} =req.body;

  try {
      const newgrade = new Grade({
        gradeName,
        departmentId,
      });
      const data = await newgrade.save();
      res
        .status(StatusCodes.CREATED)
        .json({ message: "created success", data });
     
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "add Grade error", error });
  }
};

const deleteGradeHandelr = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await Grade.deleteOne({ _id: id });
    if (data.deletedCount) {
      res.json({ message: "deleted success", data: id });
    } else {
      res.json({ message: "invalid Grade id ", data });
    }
  } catch (error) {
    res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json({ message: "delete Grade error", error });
  }
};

module.exports = {
  getAllGradeHandelr,
  addNewGradeHandelr,
  updateGradeHandelr,
  deleteGradeHandelr,
};
