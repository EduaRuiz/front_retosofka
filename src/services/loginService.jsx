import axios from "axios";

const URI = "http://localhost:8080/oauth/token";

const login = (username, password) => {
  const params = new URLSearchParams();
  params.set("grant_type", "password");
  params.set("username", username);
  params.set("password", password);
  const config = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: "Basic " + btoa("webapp:123"),
    },
  };
  return axios.post(URI, params, config);
};

const loginService = {
  login,
};
export default loginService;
