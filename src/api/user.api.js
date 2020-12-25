import axios from "axios";

const userApi = {
  login: async (user, setUser) => {
    const url = process.env.REACT_APP_URL_DATABASE +  "user/login";
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
      console.log('check variable in api: ', check);
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
  },
  getUsersPerPage: async (page, setData) => {
    const url = process.env.REACT_APP_URL_DATABASE + `user/getperpage/${page}`;
    await axios.get(url).then(users => setData(users.data));
  },
  countUsers: async(setPage) => {
    const url = process.env.REACT_APP_URL_DATABASE + 'user/count';
    await axios.get(url).then(n => setPage(n.data/20));
  },
  search: async(str, setData) => {
    let n = 0;
    const url = process.env.REACT_APP_URL_DATABASE + `user/search/${str}`;
    await axios.get(url)
               .then(res => {
                setData(res.data);
                n = res.data.length;
               })
               .catch(err => console.log(err));
    return n/20;
  },
  del: async(id) => {
    const url = process.env.REACT_APP_URL_DATABASE + `user/delete/${id}`;
    await axios.delete(url);
  }
};
export default userApi;
