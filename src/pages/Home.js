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
    if(localStorage.getItem('cartItems')){
      const arrayItems = JSON.parse(localStorage.getItem('cartItems'));
      setUserCart(arrayItems);
    }else{
      localStorage.setItem('cartItems', []);
    }
    const componentDidMount = async () => {
      await bookApi.getBooks(page, setBook);
      await bookApi.getCategogies(setCategogies);
      await bookApi.countPageByCategogies(filter, setNumPage);
    }
    componentDidMount();
  }, []);
  useEffect(() => {
    const pageUpdate = async () => {
      if(filter === 'All books'){
        await bookApi.getBooks(page, setBook);
        return;
      }
      if(categogies.indexOf(filter) === -1){
        await bookApi.search(filter, page, setBook);
        return;
      }
      await bookApi.getBookByCategogies(filter, page, setBook);
    }
    pageUpdate();
  }, [page]);
  useEffect(() => {
    const filterUpdate = async () => {
      if(filter === 'All books'){
        await bookApi.getBooks(0, setBook);
        return;
      }
      if(categogies.indexOf(filter) === -1){
        await bookApi.countPageBySearchString(filter, setNumPage);
        await bookApi.search(filter, 0, setBook);
        return;
      }else{
        await bookApi.countPageByCategogies(filter, setNumPage);
        await bookApi.getBookByCategogies(filter, 0, setBook);
      }
    }
    filterUpdate();
    setPage(0);
  }, [filter]);
  const search = (event) => {
    const searchString = event.target.value;
    if(event.keyCode === 13 && searchString !== ''){
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
              onKeyDown={search} />
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
        <Pagination numpage={numPage} currentPage={page} setpage={setPage}/>
        
        
      </div>
  );
};

export default HomePage;
