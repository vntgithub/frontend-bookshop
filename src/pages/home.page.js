import React, { useEffect, useState } from "react";
import { Container, Col, Row } from "reactstrap";
import bookApi from "../api/book.api";
import Topmenu from "../components/TopMeu";
import Banner from "../components/Banner";
import Categogies from "../components/Categogies";
import ListProduct from "../components/ListPoduct";
import Pagination from "../components/pagination";
import Footer from "../components/Footer";


const HomePage = () => {
  const [numPage, setNumPage] = useState(0);
  const [book, setBook] = useState([]);
  const [categogies, setCategogies] = useState([]);
  const [page, setPage] = useState(0);
  const [pageCategogies, setPageCategogies] = useState('');
  useEffect(() => {
    bookApi.getBooks(page, setBook);
    bookApi.getCategogies(setCategogies);
    setNumPage(4)
  }, []);
  useEffect(() => {
    bookApi.getBooks(page, setBook);
  }, [page]);
  useEffect(() => {
    if(pageCategogies === ''){
      return;
    }
    bookApi.getBookByCategogies(pageCategogies, setBook);
  }, [pageCategogies]);
  return (
    <div>
        <Topmenu />
        <Banner />
       
        <Container className="mt-5">
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
      </div>
  );
};

export default HomePage;
