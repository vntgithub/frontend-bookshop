import axios from "axios";

const bookApi = {
  getBooks: async (page, setBook) => {
    const url = "http://localhost:3001/api/book/getbooks/" + page;
    try {
      const response = await axios.get(url);
      setBook(response.data);
    } catch (error) {
      console.log(error);
    }
  },

  getCategogies: async (setCategogies) => {
    const url = "http://localhost:3001/api/book/getcategogies";
    try {
      const res = await axios.get(url);
      setCategogies(res.data);
    } catch (error) {
      console.log(error);
    }
  }
};

export default bookApi;
