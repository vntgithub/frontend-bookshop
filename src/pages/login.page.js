import React, { useState } from "react";
import { Container, Row, Input, Button } from "reactstrap";
import { Link } from "react-router-dom";

import axios from "axios";

//import userApi from "../api/user.api";

import "./login.css";
const LoginPage = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // const [checkLogin ,setCheckLogin] = useState(false);
  const getUsername = (event) => {
    setUsername(event.target.value);
  };
  const getPassword = (event) => {
    setPassword(event.target.value);
  };
  const submit = () => {
    const url = "http://localhost:3001/api/user/login";
    const postData = { username: username, password: password };
    const login = async () => {
      try {
        axios.post(url, postData)
              .then(res => console.log(res))
              .catch(err => console.log(err));
      } catch (error) {
        console.log(error);
      }
  }
    login();
    console.log("call login...");
  };
  return (
    <Container className="container-form">
      
      <Row className="justify-content-center mt-5">
        <div className="title">Login</div>
      </Row>
      <Row className="justify-content-center">
        <div className="form">
          <form>
            <Row className="mt-5">
              <label>Username</label>
              <Input
                type="text"
                value={username}
                placeholder="Enter username"
                onChange={getUsername}
              />
            </Row>
            <Row className="mt-3">
              <label>Password</label>
              <Input
                type="password"
                value={password}
                placeholder="Enter password"
                onChange={getPassword}
              />
            </Row>
            <Row className="mt-3 justify-content-center">
              <Button id="custom" onClick={submit}>
                Submit
              </Button>
            </Row>
          </form>
        </div>
      </Row>
      <Row className="mt-3 justify-content-center">
        <Link to="/sigin" className="linksign">
          Create accout
        </Link>
      </Row>
    </Container>
  );
};

export default LoginPage;
