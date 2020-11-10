import axios from "axios";

const userApi = {
  login: async (user, setUser) => {
    const url = "http://localhost:3001/api/user/login";
    await axios
      .post(url, user)
      .then((res) => {
        if(res && res.data.login){
          setUser(res.data.user);
        }
      })
      .catch((err) => console.log(err));
  },
};
export default userApi;
