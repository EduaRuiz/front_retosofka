import genericService from "./genericService";

const GET_ALL_USERS = "/players/all";
const SAVE_USER = "/players/save";
const DELETE_USER = "/players/delete/";
const UPDATE_USER = "/players/update/";

const getUsers = (baseURL) => {
  return genericService(baseURL).get(GET_ALL_USERS);
};

const saveUser = (baseURL, data) => {
  return genericService(baseURL).post(SAVE_USER, data);
};

const deleteUser = (baseURL, id) => {
  return genericService(baseURL).delete(DELETE_USER.concat(id));
};

const updateUser = (baseURL, id, data) => {
  return genericService(baseURL).put(UPDATE_USER.concat(id), data);
};

const playerService = {
  getUsers,
  saveUser,
  deleteUser,
  updateUser,
};
export default playerService;
