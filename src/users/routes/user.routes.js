const {
  addNewUserHandler,
  deleteUserHandler,
  getAllUsersHandler,
  signInHandler,
  updateUserHandler,
} = require("../controller/user.controller");
const validationRequest = require(`../../../common/middleware/validation.request`);
const isAuthorized = require(`../../../common/middleware/isAuthorized`);
const { addUserSchema, signInSchema } = require(`../joi/user.validation`);
const { GET_ALL_USERS, UPDATE_USER } = require("../endpoints");

const router = require(`express`).Router();

router.post(`/auth`, validationRequest(signInSchema), signInHandler);
router.get(`/users`, isAuthorized(GET_ALL_USERS), getAllUsersHandler);
router.put(`/users`, isAuthorized(UPDATE_USER), updateUserHandler);
router.post(`/users`, validationRequest(addUserSchema), addNewUserHandler);
router.delete(`/users/:id`, deleteUserHandler);

module.exports = router;
