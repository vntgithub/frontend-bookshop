import React from 'react';
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button, Col
} from 'reactstrap';

const Book = (props) => {
  return (
    <Col sm="3">
      <Card>
      <CardImg top width="100%" src={props.book.urlimg} alt="imgbook" />
        <CardBody>
          <CardTitle>{props.book.name}</CardTitle>
          <CardSubtitle>{props.book.author}</CardSubtitle>
          <CardText>{props.book.price}</CardText>
          <Button>Add to cart</Button>
        </CardBody>
      </Card>
    </Col>
  );
};

export default Book;