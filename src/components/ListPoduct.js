import React from "react";
import { Container, Row, Col } from "reactstrap";

import Product from "./product.component";
const ListProduct = (props) => {
  return (
    <Container>
      <Row>
        {props.book.map((item, index) => {
          return (
            <Col md="3" mt="10px" key={index}>
              <Product book={item} key={item._id} />
            </Col>
          );
        })}
      </Row>
    </Container>
  );
};

export default ListProduct;
