import React from 'react';
import { Button, Form, FormGroup, Input, Container, Row, Col } from 'reactstrap';

import './login.css';
const LoginPage = (props) => {
  return (
      <Container>
        <Form>
            <h1>Login</h1>
        <FormGroup>
            <Row className="justify-content-md-center">
                <Col sm={5}>
                    <Input type="email" name="email" id="exampleEmail" placeholder="usernmae" />
                </Col>
            </Row>
            
        </FormGroup>
        <FormGroup>
            <Row className="justify-content-md-center">
            <Col sm={5}>
                <Input type="password" name="password" id="examplePassword" placeholder="password" />
            </Col>
            </Row>
        </FormGroup>
        <Row className="justify-content-md-center">
            <Col sm={5} className="justify-content-center">
                <Button>Login</Button>
            </Col>
        </Row>
       </Form>
      </Container>
  );
}

export default LoginPage;