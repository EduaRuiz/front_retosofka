import genericService from "./genericService";

const GET_ALL_QUESTIONS = "/questions/all";
const SAVE_QUESTION = "/questions/save";
const DELETE_QUESTION = "/questions/delete/";
const UPDATE_QUESTION = "/questions/update/";
const GET_QUESTIONS_CATEGORY = "/questions/category/";
const VALIDATE_ANSWER = "/questions/validate/"

const getQuestions = (baseURL) => {
  return genericService(baseURL).get(GET_ALL_QUESTIONS);
};

const saveQuestion = (baseURL, data) => {
  return genericService(baseURL).post(SAVE_QUESTION, data);
};

const deleteQuestion = (baseURL, id) => {
  return genericService(baseURL).delete(DELETE_QUESTION.concat(id));
};

const getQuestionsByCategory = (baseURL, id) => {
  return genericService(baseURL).get(GET_QUESTIONS_CATEGORY.concat(id));
};

const validate = (baseURL, id, data) => {
  return genericService(baseURL).put(VALIDATE_ANSWER.concat(id), data);
};

const updateQuestion = (baseURL, id, data) => {
  return genericService(baseURL).put(UPDATE_QUESTION.concat(id), data);
};

const questionService = {
  getQuestions,
  saveQuestion,
  deleteQuestion,
  updateQuestion,
  getQuestionsByCategory,
  validate
};
export default questionService;
