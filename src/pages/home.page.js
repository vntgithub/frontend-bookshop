import React, { useEffect, useState } from "react";
import { Container, Col, Row } from "reactstrap";
import bookApi from "../api/book.api";
import Topmenu from "../components/TopMeu";
import Banner from "../components/Banner";
import Categogies from "../components/Categogies";
import ListProduct from "../components/ListPoduct";
import Pagination from "../components/pagination";
import Footer from "../components/Footer";
import CartContext from "../contexts/cart.context";

import "./home.css";

const HomePage = () => {
  const [numPage, setNumPage] = useState(0);
  const [book, setBook] = useState([]);
  const [categogies, setCategogies] = useState([]);
  const [page, setPage] = useState(0);
  const [pageCategogies, setPageCategogies] = useState('All books');
  const [userCart, setUserCart] = useState([]);
  useEffect(() => {
    const componentDidMount = async () => {
      await bookApi.getBooks(page, setBook);
      await bookApi.getCategogies(setCategogies);
      setNumPage(4);
      if(localStorage.getItem('cartItems'))
        setUserCart(localStorage.getItem('carItems'));
    }
    componentDidMount();
  }, []);
  useEffect(() => {
    if(pageCategogies === 'All books')
      bookApi.getBooks(page, setBook);
    
  }, [page]);
  useEffect(() => {
    bookApi.getBookByCategogies(pageCategogies, setBook);
  }, [pageCategogies]);
  return (
    <div>
      <CartContext.Provider value={userCart.length}>
        <Topmenu />
        <Banner />
        <Container className="mt-5">
        <Row className="offset-md-2">
            <h2 className="current-filter">{pageCategogies}</h2>
          </Row>
          <Row>
            <Col md="2"><Categogies 
              categogiesState={{categogies, setPageCategogies}} 
              setBook={setBook}/>
            </Col>
            <Col md="10"><ListProduct book={book} /></Col>
          </Row>
        </Container>
        <Pagination numpage={numPage} setpage={setPage}/>
        <Footer />
        </CartContext.Provider>
      </div>
  );
};

export default HomePage;
