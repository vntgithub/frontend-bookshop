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

  // getByName: (name) => {},
};

export default bookApi;
