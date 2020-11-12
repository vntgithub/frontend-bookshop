import axios from "axios";

const bookApi = {
  getBooks: async (page, setBook) => {
    const url = process.env.REACT_APP_URL_DATABASE + "book/getbooks/" + page;
    try {
      const response = await axios.get(url);
      setBook(response.data);
    } catch (error) {
      console.log(error);
    }
  },

  getCategogies: async (setCategogies) => {
    const url = process.env.REACT_APP_URL_DATABASE+"book/getcategogies";
    try {
      const res = await axios.get(url);
      setCategogies(res.data);
    } catch (error) {
      console.log(error);
    }
  },
  getBookByCategogies: async (categogies, setBook) => {
    const url = process.env.REACT_APP_URL_DATABASE+"book/findbycategogies/" + categogies ;
    try {
      const res = await axios.get(url);
      setBook(res.data);
    } catch (error) {
      
    }
  },
  countPage: async (categogies, setPage) => {
    const url = process.env.REACT_APP_URL_DATABASE + `book/countbycategogies/${categogies}`;
    try {
      const res = await axios.get(url);
      setPage(Math.ceil(res.data/32));
      
    } catch (error) {
      
    }
  },
  search: async (searchString, setBook) => {
    const url = process.env.REACT_APP_URL_DATABASE + `book/findbyname/${searchString}`;
    await axios.get(url).then(res => setBook(res.data));
  }
};

export default bookApi;
