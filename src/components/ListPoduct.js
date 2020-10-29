import React from "react";
import { Container, Row, Col } from "reactstrap";

import Product from "./product.component";
const ListProduct = (props) => {
  return (
    <Container>
      <Row>
        {props.book.map((item) => {
          return (
            <Col md="3" mt="10px">
              <Product book={item} key={item._id} />
            </Col>
          );
        })}
      </Row>
    </Container>
  );
};

export default ListProduct;
