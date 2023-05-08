const {
    GET_ALL_EXAM,
  } = require("../../../src/exam/endpoints");
  const {
    GET_ALL_ANSWERS,
    ADD_NEW_ANSWERS,
  } = require("../../../src/examAnswers/endpoints");

  module.exports = [
    GET_ALL_EXAM,
    GET_ALL_ANSWERS,
    ADD_NEW_ANSWERS,
  ];
