import React, { useEffect, useState } from "react";

import bookApi from "../api/book.api";

import Topmenu from "../components/TopMeu";
import Banner from "../components/Banner";
import ListProduct from "../components/ListPoduct";
import Pagination from "../components/pagination";
import Footer from "../components/Footer";

const HomePage = () => {
  const [numPage, setNumPage] = useState(4);
  const [book, setBook] = useState([]);
  const [page, setPage] = useState(0);
  useEffect(() => {
    bookApi.getBooks(page, setBook);
  });
  return (
    <div>
      <Topmenu />
      <Banner />
      <div style={{ height: "100px" }}></div>
      <ListProduct book={book} />
      <Pagination numpage={numPage} setpage={setPage}/>
      <Footer />
    </div>
  );
};

export default HomePage;
