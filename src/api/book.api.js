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
  getBookByCategogies: async (categogies, page, setBook) => {
    const url = process.env.REACT_APP_URL_DATABASE+ `book/findbycategogies/${categogies}&${page}`;
    try {
      const res = await axios.get(url);
      setBook(res.data);
    } catch (error) {
      
    }
  },
  countPageByCategogies: async (categogies, setPage) => {
    const url = process.env.REACT_APP_URL_DATABASE + `book/countbycategogies/${categogies}`;
    try {
      const res = await axios.get(url);
      setPage(Math.ceil(res.data/20));
    } catch (error) {
      
    }
  },
  search: async (searchString, page, setBook) => {
    let countPage = 0;
    const url = process.env.REACT_APP_URL_DATABASE + `book/findbyname/${searchString}&${page}`;
    await axios.get(url)
    .then(res => {
      setBook(res.data);
      countPage = res.data.length/20;
    })
    .catch(error => console.log(error));
    return countPage;
  },
  countPageBySearchString: async (searchString, setPage) => {
    const url = process.env.REACT_APP_URL_DATABASE + `book/countbysearchstring/${searchString}`;
    await axios.get(url)
    .then(res => setPage(res.data/20))
    .catch(error => console.log(error));
  },
  update: async (dataUpdate, id) => {
    const url = process.env.REACT_APP_URL_DATABASE + `book/update/${id}`;
     await axios.put(url, dataUpdate).then(res => console.log(res.data));
  }
};

export default bookApi;
