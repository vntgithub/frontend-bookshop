import axios from "axios";

const userApi = {
  login: async (username, password) => {
    const url = "http://localhost:3001/api/user/login";
    await axios
      .post(url, { username: username, password: password })
      .then((res) => res)
      .catch((err) => console.log(err));
  },
};
export default userApi;
