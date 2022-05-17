import genericService from "./genericService";

const SAVE_PLAYER = "/players/save";
const FIND_PLAYER = "/players/find/"


const savePlayer = (baseURL,data) => {
  return genericService(baseURL).post(SAVE_PLAYER, data);
};

const findPlayer = (baseURL,id) => {
  return genericService(baseURL).get(FIND_PLAYER.concat(id));
};

const SignupService = {
  savePlayer,
  findPlayer,
};
export default SignupService;
