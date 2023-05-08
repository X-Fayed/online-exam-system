const {
  getAllGradeHandelr,
  addNewGradeHandelr,
  updateGradeHandelr,
  deleteGradeHandelr,
  } = require("../controller/grade.controller");
  
  const router = require("express").Router();
  const validateRequest = require("../../../common/middleware/validation.request");
  const { gradeSchema,updateSchema } = require("../joi/gradeValidation");
  router.get("/grade", getAllGradeHandelr);
  router.get("/grade/:id", getAllGradeHandelr);
  
  router.post("/grade", validateRequest(gradeSchema), addNewGradeHandelr);
  
  router.put("/grade/:id", validateRequest(gradeSchema) , updateGradeHandelr);
  router.delete("/grade/:id" ,deleteGradeHandelr);
  
  module.exports = router;
  