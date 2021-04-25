import React from 'react';
import { Container, Row } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes
} from '@fortawesome/free-solid-svg-icons';

import check from '../img/check (1).svg';
import './style/modallogin.css';


const Mess = (props) => {
    const close = () => props.setIsOpenMess(false);
    return(
        <div>
        <div className="overlay"></div>
        <Container className="login-form">
            <FontAwesomeIcon icon={faTimes} className="exit" onClick={close} />
            <Row className="justify-content-center mt-5">
                <img width="150px" height="150px" src={check} alt="check" />
            </Row>
            <Row className="justify-content-center mt-3 mb-3">
                <h2>{props.mess}</h2>
            </Row>
        </Container>
        </div>
        
    );
}
export default Mess;