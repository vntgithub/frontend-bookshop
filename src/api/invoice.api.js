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
  }
};

export default invoiceApi;
