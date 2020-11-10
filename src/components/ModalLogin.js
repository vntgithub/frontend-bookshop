import React, { useState, useContext } from 'react';
import { Container, FormGroup, Input, Label, Form, Row, Col } from 'reactstrap';

import userApi from '../api/user.api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle, faTimes
} from '@fortawesome/free-solid-svg-icons';
import './style/modallogin.css';
import { UserContext } from '../contexts/Context';

const ModalLogin = (props) => {
    const { user, setUser } = useContext(UserContext);
    const [data, setData] = useState({
        username: '', 
        password: '', 
    });
    const setUsername = (event) => setData({...data, username: event.target.value})
    const setPassword = (event) => setData({...data, password: event.target.value});
    const submit = () => {
        let check = true;
        if(data.username === ''){
            check &= false;
            document.getElementById('name').style.visibility = "unset";
        }else{
            document.getElementById('name').style.visibility = "hidden";
        }
        if(data.password === ''){
            check &= false;
            document.getElementById('phone').style.visibility = "unset";
            
        }else{
                document.getElementById('phone').style.visibility = "hidden";
        }
        if(check) {
            userApi.login(data, setUser);
            props.openModalLogin();
        }
        return;
    }
    return(
        <div>
        <div className="overlay"></div>
        <Container className="invoice-form">
            <FontAwesomeIcon icon={faTimes} className="exit" onClick={props.toggle} />
            <Row className="justify-content-center m-2">
                <h1 className="title-information">Infomation</h1>
            </Row>
            <Row className="justify-content-center">
                <Col sm={6}>
                    <Form onSubmit={submit}>
                        <FormGroup>
                            <Label>UserName</Label>
                            <Input onChange={setUsername} name="name" type="text" />
                            <div id="name" className="require">
                                <FontAwesomeIcon icon={faExclamationCircle} />
                                <p>Username is require</p>
                            </div>
                            <div className="err">{}</div>
                            <Label>Password</Label>
                            <Input onChange={setPassword} name="phone" type="password" />
                            <div id="phone" className="require">
                                <FontAwesomeIcon icon={faExclamationCircle} />
                                <p>Password is require</p>
                            </div>
                        </FormGroup>
                    </Form>
                </Col>
            </Row>
            <Row className="justify-content-center mb-2">
                <h4 className="mt-5 button-submit" onClick={submit} >Submit</h4>
            </Row>
        </Container>
        </div>
    );
}
export default ModalLogin;