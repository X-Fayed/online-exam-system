const {
  addSubjectHandler,
  getSubjectsHandler,
  deleteSubjectHandler,
  updateSubjectHandler,
} = require("../controller/subject.controller");
const isAuthorized = require(`../../../common/middleware/isAuthorized`);
const validationRequest = require(`../../../common/middleware/validation.request`);
const { addSubjectSchema } = require(`../joi/subject.validation`);
const {
  ADD_SUBJECT,
  GET_SUBJECTS,
  DELETE_SUBJECT,
  UPDATE_SUBJECT,
} = require(`../endpoints`);

const router = require(`express`).Router();

router.post(
  `/subjects`,
  isAuthorized(ADD_SUBJECT),
  validationRequest(addSubjectSchema),
  addSubjectHandler
);
router.get(`/subjects/:id`, isAuthorized(GET_SUBJECTS), getSubjectsHandler);
router.put(`/subjects/:id`, isAuthorized(UPDATE_SUBJECT), updateSubjectHandler);
router.delete(
  `/subjects/:id`,
  isAuthorized(DELETE_SUBJECT),
  deleteSubjectHandler
);

module.exports = router;
