const {
  getAllQuestionHandelr,
  addNewQuestionHandelr,
  updateQuestionHandelr,
  deleteQuestionHandelr,
  } = require("../controller/question.controller");
  
  const router = require("express").Router();
  const validateRequest = require("../../../common/middleware/validation.request");
  const { questionSchema } = require("../joi/questionValidation");
  const { GET_ALL_QUESTIONS,DELETE_QUESTIONS,UPDATE_QUESTIONS,ADD_NEW_QUESTIONS } = require("../endpoints");
  const isAuthorized = require(`../../../common/middleware/isAuthorized`);

  router.get("/question",isAuthorized(GET_ALL_QUESTIONS), getAllQuestionHandelr);
  router.post("/question",isAuthorized(ADD_NEW_QUESTIONS), validateRequest(questionSchema), addNewQuestionHandelr);
  router.put("/question/:id",isAuthorized(UPDATE_QUESTIONS), validateRequest(questionSchema),updateQuestionHandelr);
  router.delete("/question/:id",isAuthorized(DELETE_QUESTIONS), deleteQuestionHandelr);
  
  module.exports = router;
