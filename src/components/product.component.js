import React from "react";
import { useContext } from "react";
import { Row } from "reactstrap";

import CartContext from '../contexts/cart.context';
import "./style/product.css";

const product = (props) => {
  const addToCart = (book) => {
   return () => {
     console.log(book._id);
      
   }
  }
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
      {/* <CartContext.Consumer> */}
        <Row className="justify-content-center button">
          <button onClick={addToCart(props.book)}>Add to cart</button>
        </Row>
      {/* </CartContext.Consumer> */}
    </div>
  );
};
export default product;
