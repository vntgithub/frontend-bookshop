import React, { useEffect, useState, useContext } from "react";
import { Container, Col, Row, Input } from "reactstrap";

import { CartContext } from "../contexts/Context";
import bookApi from "../api/book.api";
import Banner from "../components/Banner";
import Categogies from "../components/Categogies";
import ListProduct from "../components/ListPoduct";
import Pagination from "../components/Pagination";


import "./style/home.css";

const HomePage = () => {
  const [numPage, setNumPage] = useState(0);
  const [book, setBook] = useState([]);
  const [categogies, setCategogies] = useState([]); //List categogies
  const [page, setPage] = useState(0);
  const [filter, setFilter] = useState('All books'); //Current filter
  const { setUserCart } = useContext(CartContext);
  useEffect(() => {
    const componentDidMount = async () => {
      await bookApi.getBooks(page, setBook);
      await bookApi.getCategogies(setCategogies);
      await bookApi.countPageByCategogies(filter, setNumPage);
      if(localStorage.getItem('cartItems')){
        const arrayItems = JSON.parse(localStorage.getItem('cartItems'));
        setUserCart(arrayItems);
      }else{
        localStorage.setItem('cartItems', []);
      }
    }
    componentDidMount();
  }, []);
  useEffect(() => {
    if(filter === 'All books')
      bookApi.getBooks(page, setBook);
    
  }, [page]);
  useEffect(() => {
    bookApi.getBookByCategogies(filter, setBook);
    bookApi.countPageByCategogies(filter, setNumPage);
  }, [filter]);
  const search = (event) => {
    const searchString = event.target.value;
    if(event.keyCode === 13 && searchString !== ''){
      bookApi.search(searchString, setBook);
      bookApi.countPageBySearchString(searchString, setPage);
      setFilter(searchString);
    }
  }
  return (
    <div>
      
        
        <Banner />
        <Container className="mt-5">
        <Row className="offset-md-2">
            <Col md={6}>
              <h4 className="current-filter">Filter: {filter}</h4>
            </Col>
            <Col md={6} className="search">
              <Input type="text" 
              placeholder="Search name..."  
              onKeyUp={search} />
            </Col>
          </Row>
          <Row>
            <Col md="2">
              <Categogies 
              categogies={categogies}
              setFilter={setFilter}
               />
            </Col>
            <Col md="10"><ListProduct book={book} /></Col>
          </Row>
        </Container>
        <Pagination numpage={numPage} setpage={setPage}/>
        
        
      </div>
  );
};

export default HomePage;
