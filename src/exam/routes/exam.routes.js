const {
  getAllExamHandelr,
  addNewExamHandelr,
  updateExamHandelr,
  deleteExamHandelr,
  } = require("../controller/exam.controller");
  const router = require("express").Router();
  const validateRequest = require("../../../common/middleware/validation.request");
  const { examSchema } = require("../joi/examValidation");
  const { GET_ALL_EXAM,DELETE_EXAM,ADD_NEW_EXAM,UPDATE_EXAM} = require("../endpoints");
  const isAuthorized = require(`../../../common/middleware/isAuthorized`);

  router.get("/exam",isAuthorized(GET_ALL_EXAM), getAllExamHandelr);
  router.post("/exam",isAuthorized(ADD_NEW_EXAM), validateRequest(examSchema), addNewExamHandelr);
  router.put("/exam/:id",isAuthorized(UPDATE_EXAM),validateRequest(examSchema), updateExamHandelr);
  router.delete("/exam/:id",isAuthorized(DELETE_EXAM), deleteExamHandelr);
  
  module.exports = router;
 
 