import React from "react";

import "./style/product.css";

const product = (props) => {
  return (
    <div className="product">
      <div class="img">
        <img src={props.book.urlimg} alt="productimg" />
      </div>
      <div class="name">{props.book.name}</div>
      <div class="author">
        <p>By {props.book.author}</p>
      </div>
      <div class="price">$ {props.book.price}</div>
      <div class="button">
        <button>Add to cart</button>
      </div>
    </div>
  );
};
export default product;
