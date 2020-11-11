import axios from "axios";

const userApi = {
  login: async (user, setUser) => {
    const url = "http://localhost:3001/api/user/login";
    await axios
      .post(url, user)
      .then((res) => {
        if(res && res.data.login){
          document.cookie = "id=" + res.data.user._id;
          setUser(res.data.user);
        }
      })
      .catch((err) => console.log(err));
  },
  getByCookie: async (cookie, setUser) => {
    const url = process.env.REACT_APP_URL_DATABASE + `user/getbyid/${cookie}` 
    await axios.get(url)
          .then(res => setUser(res.data.user))
          .catch(err => console.log(err))
  }
};
export default userApi;
