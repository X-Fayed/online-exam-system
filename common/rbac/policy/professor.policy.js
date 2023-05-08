const {
  GET_SUBJECTS,
 
} = require("../../../src/subject/endpoints");

const {
  GET_ALL_EXAM,
  DELETE_EXAM,
  ADD_NEW_EXAM,
  UPDATE_EXAM,
} = require("../../../src/exam/endpoints");

const {
  GET_ALL_QUESTIONS,
  DELETE_QUESTIONS,
  UPDATE_QUESTIONS,
  ADD_NEW_QUESTIONS,
} = require("../../../src/questions/endpoints");

const {
  GET_ALL_ANSWERS,
  ADD_NEW_ANSWERS,
} = require("../../../src/examAnswers/endpoints");

module.exports = [
  GET_SUBJECTS,
  GET_ALL_EXAM,
  DELETE_EXAM,
  ADD_NEW_EXAM,
  UPDATE_EXAM,
  GET_ALL_QUESTIONS,
  DELETE_QUESTIONS,
  UPDATE_QUESTIONS,
  ADD_NEW_QUESTIONS,
  GET_ALL_ANSWERS,
  ADD_NEW_ANSWERS,
];
