import React from "react";
import { useContext } from "react";
import { Row } from "reactstrap";

import CartContext from '../contexts/cart.context';
import "./style/product.css";

const Product = (props) => {
  const { userCart, setUserCart } = useContext(CartContext);
  const addToCart = (book) => {
   return () => {
     const index = userCart.findIndex(item => item._id === book._id);
     if(index === -1){
        const newItem = { _id: book._id, count: 1};
        const newCart = userCart.concat(newItem);
        localStorage.setItem("cartItems", JSON.stringify(newCart));
        setUserCart(newCart);
     }else{
        const newCart = userCart;
        newCart[index].count = newCart[index].count + 1;
        console.log(newCart);
        localStorage.setItem("cartItems", JSON.stringify(newCart));
        setUserCart(newCart);
     }
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
      <Row className="justify-content-center button">
        <button onClick={addToCart(props.book)}>Add to cart</button>
      </Row>
    </div>
  );
};
export default Product;
