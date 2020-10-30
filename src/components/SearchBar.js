import React from 'react';
import { Row, Input, Col } from 'reactstrap';

const SearchBar = (props) => {
    return(
        <Row>
            <Col sm="8" md={{ size: 3, offset: 3 }}><Input type="text" /></Col>
        </Row>
    );
}

export default SearchBar;