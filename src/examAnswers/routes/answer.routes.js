const {
  getAllAnswerHandelr,
  addNewAnswerHandelr,
  updateAnswerHandelr,
  deleteAnswerHandelr,
  } = require("../controller/answer.controller");
  
  const router = require("express").Router();
  const validateRequest = require("../../../common/middleware/validation.request");
  const { answerSchema } = require("../joi/answerValidation");
  const { GET_ALL_ANSWERS,DELETE_ANSWERS,UPDATE_ANSWERS,ADD_NEW_ANSWERS,} = require("../endpoints");
  const isAuthorized = require(`../../../common/middleware/isAuthorized`);

  router.get("/answer/:id",isAuthorized(GET_ALL_ANSWERS), getAllAnswerHandelr);
  router.post("/answer",isAuthorized(ADD_NEW_ANSWERS), validateRequest(answerSchema), addNewAnswerHandelr);
 /*
  router.put("/answer/:id",isAuthorized(UPDATE_ANSWERS), validateRequest(answerSchema),updateAnswerHandelr);
  router.delete("/answer/:id",isAuthorized(DELETE_ANSWERS), deleteAnswerHandelr);
  */
  module.exports = router;
