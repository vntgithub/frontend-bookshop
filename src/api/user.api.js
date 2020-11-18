import axios from "axios";

const userApi = {
  login: async (user, setUser) => {
    const url = "http://localhost:3001/api/user/login";
    let check = false;
    await axios
      .post(url, user)
      .then((res) => {
        if(res && res.data.login){
          check = res.data.login;
          let expires = new Date();  
          expires.setTime(expires.getTime() + 31536000000);
          document.cookie = `id=${res.data.user._id}; expires=${expires}; path=/`;
          setUser(res.data.user);
        }
      })
      .catch((err) => console.log(err));
      return check;
  },
  getByCookie: async (cookie, setUser) => {
    const url = process.env.REACT_APP_URL_DATABASE + `user/getbyid/${cookie}` 
    await axios.get(url)
          .then(res => setUser(res.data.user))
          .catch(err => console.log(err))
  },
  create: async (user) => {
    const url = process.env.REACT_APP_URL_DATABASE + "user/create";
    await axios.post(url, user)
  },
  checkExist: async (username) => {
    const url = process.env.REACT_APP_URL_DATABASE + "user/check";
    const res = await axios.post(url, {username: username});
    return res;
  }
};
export default userApi;
