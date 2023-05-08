const { StatusCodes } = require("http-status-codes");
const Department = require("../model/department.model");
const Grade = require("../../grade/model/grade.model");


const getAllDepartmentHandelr = async (req, res) => {

  try {
    let departmentArr = [];
    const cursor =Department.find({}).cursor();
    for (
      let doc = await cursor.next();
      doc != null;
      doc = await cursor.next()
    ) {
      const grades = await Grade.find({ departmentId: doc._id });
      const obj = { ...doc._doc, grades };
      departmentArr.push(obj);
    }
    res.json({ message: "success", departmentArr });

  } catch (error) {
    res.json({ message: "Error in get all departments", error });
  }
};


const updateDepartmentHandelr = async (req, res) => {
  const { id } = req.params;
  const { departmentName } = req.body;
  try {
    if (id.match(/^[0-9a-fA-F]{24}$/)){
      const data = await Department.updateOne({ _id: id }, { departmentName });
      if (data.modifiedCount) {
        res.status(StatusCodes.OK).json({ message: `Updated success` });
      }
      else{
        res
            .status(StatusCodes.BAD_REQUEST)
            .json({ message: `Deapartment not found` });
      }
    }
    else{
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "invalid id"});
    }
    
  } catch (error) {
    res.json({ message: "update department error", error });
  }
};

const addNewDepartmentHandelr = async (req, res) => {
  const { departmentName} =req.body;

  try {
      const newDepartment = new Department({
        departmentName,
      });
      const data = await newDepartment.save();
      res
        .status(StatusCodes.CREATED)
        .json({ message: "created success", data });

  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "error in add department", error });
  }
};

const deleteDepartmentHandelr = async (req, res) => {
  const { id } = req.params;
  try {
    const question1 =await Grade.deleteMany({departmentId:id})
    const data = await Department.deleteOne({ _id: id });
    
    if (data.deletedCount) {
      res.json({ message: "deleted success", data: id });
    } else {
      res.json({ message: "invalid department id ", data });
    }
  } catch (error) {
    res.json({ message: "error in delete department", error });
  }
};

module.exports = {
  getAllDepartmentHandelr,
  addNewDepartmentHandelr,
  updateDepartmentHandelr,
  deleteDepartmentHandelr,
};
