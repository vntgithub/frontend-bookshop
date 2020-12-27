import axios from 'axios';

const adminApi = {
    login: async(admin, setAdmin) => {
        const url = process.env.REACT_APP_URL_DATABASE +  "admin/login";
        let check = false;
        await axios
        .post(url, admin)
        .then((res) => {
          console.log(res.data)
          if(res && res.data.check){
            check = res.data.check;
            let expires = new Date();  
            expires.setTime(expires.getTime() + 31536000000);
            document.cookie = `idadmin=${res.data.adminData._id}; expires=${expires}; path=/Admin`;
            setAdmin(res.data.adminData);
          }
          })
          .catch((err) => console.log(err));
          return check;
    },
    getByCookie: async (cookie, setAdmin) => {
      const url = process.env.REACT_APP_URL_DATABASE + `admin/getbycookie/${cookie}` 
      await axios.get(url)
            .then(res => setAdmin(res.data.adminData))
            .catch(err => console.log(err))
    },
}
export default adminApi;