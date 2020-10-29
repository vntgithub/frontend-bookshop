import React from "react";
import { Container, Row, Col } from "reactstrap";

import "./style/product.css";

const product = (props) => {
  return (
    <div className="product" key={props.key}>
      <Row className="justify-content-center img">
        <img src={props.book.urlimg} alt="productimg" />
      </Row>
      <Row className="justify-content-center " mt="10px">
        <div className="name">
          <div>
          {props.book.name}
          </div>
        </div>
       
      </Row>
      <div>
      <Row className="justify-content-center author" mt="10px">
        <p>By {props.book.author}</p>
      </Row>
      <Row className="justify-content-center price" mt="10px">
       $ {props.book.price}
      </Row>
      <Row className="justify-content-center button">
      <button>Add to cart</button>
      </Row>
      </div>
    </div>
  );
};
export default product;
