import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import axios from "axios";
import { Container, Row, Col } from "reactstrap";
// import bookApi from "./api/book.api";

import "./App.css";
import LoginPage from "./pages/login.page";
import Topmenu from "./components/TopMeu";
import Banner from "./components/Jumbotron";
import Product from "./components/product.component";

function App(props) {
  const [book, setBook] = useState([]);

  useEffect(() => {
    const baseURL = "http://localhost:3001/api";
    const url = baseURL + `/book/getbooks/3`;
    const getData = async () => {
      try {
        const response = await axios.get(url);
        console.log(response.data);
        setBook(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);
  return (
    <Router>
      <div className="App">
        <Topmenu />
        <Banner />
        <div style={{ height: "100px" }}></div>
        <Container>
          <Row>
            {book.map((item) => {
              return (
                <Col md="4" mt="10px">
                  <Product book={item} key={item._id} />
                </Col>
              );
            })}
          </Row>
        </Container>
      </div>

      <Switch>
        <Route path="/login" exact component={LoginPage} />
      </Switch>
    </Router>
  );
}

export default App;
