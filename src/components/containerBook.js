import React from 'react';
import { Container, Row} from 'reactstrap';

import Book from './book';

const containerBook = (props) => {
    return(
        <Container className="mt-5">
            <Row>
            {props.data.map((item) => {
              return(
                <Book book={item} />
              );
            })}
            </Row>
          </Container>
    );
};

export default containerBook;