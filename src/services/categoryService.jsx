import genericService from "./genericService";

const GET_ALL_CATEGORIES = "/categories/all";
const SAVE_CATEGORY = "/categories/save";
const DELETE_CATEGORY = "/categories/delete/";
const UPDATE_CATEGORY = "/categories/update/";

const getCategories = (baseURL) => {
  return genericService(baseURL).get(GET_ALL_CATEGORIES);
};

const saveCategory = (baseURL, data) => {
  return genericService(baseURL).post(SAVE_CATEGORY, data);
};

const deleteCategory = (baseURL, id) => {
  return genericService(baseURL).delete(DELETE_CATEGORY.concat(id));
};

const updateCategory = (baseURL, id, data) => {
  return genericService(baseURL).put(UPDATE_CATEGORY.concat(id), data);
};

const categoryService = {
  getCategories,
  saveCategory,
  deleteCategory,
  updateCategory,
};
export default categoryService;
