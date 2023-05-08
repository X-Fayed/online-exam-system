const {
  GET_ALL_USERS,
  ADD_NEW_USER,
  DELETE_USER,
  UPDATE_USER,
} = require("../../../src/users/endpoints");
const {
  ADD_SUBJECT,
  GET_SUBJECTS,
  DELETE_SUBJECT,
  UPDATE_SUBJECT,
} = require(`../../../src/subject/endpoints`);
const {
  GET_ALL_ANSWERS,
  ADD_NEW_ANSWERS,
} = require("../../../src/examAnswers/endpoints");
module.exports = [
  GET_ALL_USERS,
  ADD_NEW_USER,
  DELETE_USER,
  UPDATE_USER,
  ADD_SUBJECT,
  GET_SUBJECTS,
  DELETE_SUBJECT,
  UPDATE_SUBJECT,
  GET_ALL_ANSWERS,
  ADD_NEW_ANSWERS,
];
