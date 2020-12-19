import axios from "axios";

const invoiceApi = {
  addInvoice: async (invoice) => {
      const url = process.env.REACT_APP_URL_DATABASE + "invoice/add";
      try {
          const res = await axios.post(url, invoice);
          console.log(res);
      } catch (error) {
          console.log(error);
      }
  },
  getInvoiceByUserId: async(userId) => {
      const url = process.env.REACT_APP_URL_DATABASE + `invoice/getbyuserid/${userId}`;
      try {
        const res = await axios.get(url);
        return res;
    } catch (error) {
        console.log(error);
    }
  },
  updateState: async (id, state) => {
      const url = process.env.REACT_APP_URL_DATABASE + 'invoice/update';
      await axios.put(url, { id: id, state: state }).then(res => console.log(res.data));
  },
  getByState: async (userId, state) => {
      const url = process.env.REACT_APP_URL_DATABASE + `invoice/getbystate/${state}&${userId}`;
      const response = await axios.get(url);
      return response;
  },
  getPerPage: async(currenPage, setData) => {
      const url = process.env.REACT_APP_URL_DATABASE + `invoice/getperpage/${currenPage}`;
      await axios.get(url)
                 .then(res => setData(res.data))
                 .catch(err => console.log(err));
  },
  count: async (setPage) => {
      const url = process.env.REACT_APP_URL_DATABASE + 'invoice/count';
      await axios.get(url).then(res => setPage(res.data/20));
  },
  search: async(str, setData) => {
      const url = process.env.REACT_APP_URL_DATABASE + `invoice/search/${str}`;
      await axios.get(url)
                 .then(res => {
                     setData([res.data]);
                 });
  },
  getAllByState: async(page, state, setData) => {
      const url = process.env.REACT_APP_URL_DATABASE + `invoice/getallbystate/${page}&${state}`;
      console.log(url);
      await axios.get(url).then(res => setData(res.data));
  }
};

export default invoiceApi;
