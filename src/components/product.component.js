import React from "react";
import { Row } from "reactstrap";

import "./style/product.css";

const product = (props) => {
  return (
    <div className="product" >
      <Row className="justify-content-center img">
        <img src={props.book.urlimg} alt="productimg" />
      </Row>
      <div className="name-author">
        <Row className="justify-content-center mb-1" >
          <div className="name">
            {props.book.name}
          </div>
        </Row>
        <Row className="justify-content-center author" mt="10px">
          <p>By {props.book.author}</p>
        </Row>
      </div>
      <Row className="justify-content-center price" mt="10px">
       $ {props.book.price}
      </Row>
      <Row className="justify-content-center button">
      <button >Add to cart</button>
      </Row>
    </div>
  );
};
export default product;
