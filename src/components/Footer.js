import React from "react";
import { Row, Col } from "reactstrap";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, 
  faEnvelope, 
  faPhone, faCopyright } from '@fortawesome/free-solid-svg-icons';
import "./style/footer.css";

const Footer = () => {
  return (
    <div className='footer mt-3' >
      <Row>
        <Col md={{size: 2, offset: 2}}>
          <Row className="mt-3 title-footer">About: This project for </Row>
          <Row className="mt-3">
            
          </Row>
        </Col>
        <Col md={1}>
          <Row className="mt-3 title-footer">
            Instructors:
          </Row>
          <Row className="mt-3">
            Dr. Thái Minh Tuấn
          </Row>
       </Col>
      <Col md={{size: 2, offset: 1}}>
        <Row className="mt-3 title-footer">
          This project created by:
        </Row>
        <Row className="mt-3">  
          ReactJS
        </Row>
        <Row className="mt-3">
          ExpressJS
        </Row>
        <Row className="mt-3">
          MongoDB
        </Row>
      </Col>
      <Col md={{size: 2, offset: 1}}>
        <Row className="mt-3 title-footer">
          Contact:
        </Row>
        <Row className="mt-3">
          <FontAwesomeIcon icon={faHome} className="mr-2 mt-1" />
          Can Tho
        </Row>
        <Row className="mt-3">
        <FontAwesomeIcon icon={faEnvelope} className="mr-2 mt-1" />
          trieub1706657@student.ctu.edu.vn
        </Row>
        <Row className="mt-3">
        <FontAwesomeIcon icon={faPhone} className="mr-2 mt-1" />
          +84 779 861 239
        </Row>
      </Col>
      </Row>
      <Row className="justify-content-center mt-3">
          <Col md={{size: 6}} className="justify-content-center boder-top">
            <FontAwesomeIcon icon={faCopyright} className="mr-1" style={{marginTop: "3px"}} />
            2020 Copyright: Vo Nhat Trieu
          </Col>
      </Row>
      <Row className="justify-content-center">
      <a href="https://github.com/vntgithub" target="_blank">
        <i className="fa fa-github footer-icon"></i>
      </a>
      <a href="https://google.com" target="_blank">
        <i className="fa fa-google-plus-official footer-icon"></i>
      </a>
      <a href="https://www.facebook.com/vntrieu25879/" target="_blank">
        <i className="fa fa-facebook-official footer-icon"></i>
      </a>
      </Row>
    </div>
  );
};

export default Footer;
