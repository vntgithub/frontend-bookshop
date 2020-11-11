import React, { useState, useContext } from 'react';
import { Container, FormGroup, Input, Label, Form, Row, Col } from 'reactstrap';

import userApi from '../api/user.api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { UserContext } from '../contexts/Context';
import { faExclamationCircle, faTimes
} from '@fortawesome/free-solid-svg-icons';
import './style/modallogin.css';

const ModalSigup = (props) => {
    const { setUser } = useContext(UserContext);
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
        <Container className="login-form">
            <FontAwesomeIcon icon={faTimes} className="exit" onClick={props.openModalLogin} />
            <Row className="justify-content-center m-2">
                <h1 className="title-information">SignUp</h1>
            </Row>
            <Row className="justify-content-center">
                <Col sm={6}>
                    <Form onSubmit={submit}>
                        <FormGroup>
                            <Label>UserName</Label>
                            <Input onChange={setUsername} name="name" type="text" />
                            <div className="require">
                                <FontAwesomeIcon icon={faExclamationCircle} />
                                <p>Username is require</p>
                            </div>
                            <Label>Password</Label>
                            <Input onChange={setUsername} name="password" type="password" />
                            <div className="require">
                                <FontAwesomeIcon icon={faExclamationCircle} />
                                <p>Password is require</p>
                            </div>
                            <Label>Confirm password</Label>
                            <Input onChange={setUsername} name="confirm-password" type="password" />
                            <div id="name" className="require">
                                <FontAwesomeIcon icon={faExclamationCircle} />
                                <p>Confirm password is require</p>
                            </div>
                            <div className="err">{}</div>
                            <Label>Name</Label>
                            <Input name="name" type="text" />
                            <div className="require">
                                <FontAwesomeIcon icon={faExclamationCircle} />
                                <p>Name is require</p>
                            </div>
                            <Label>Phone numbers</Label>
                            <Input name="phonenumbers" type="text" />
                            <div id="phone" className="require">
                                <FontAwesomeIcon icon={faExclamationCircle} />
                                <p>Phone numbers is require</p>
                            </div>
                            <Label>Adress</Label>
                            <Input name="adress" type="text" />
                            <div className="require">
                                <FontAwesomeIcon icon={faExclamationCircle} />
                                <p>Adress is require</p>
                            </div>
                            <Label>Image</Label>
                            <Input name="image" type="file" />
                            <div className="require">
                                <FontAwesomeIcon icon={faExclamationCircle} />
                                <p>Image is require</p>
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
export default ModalSigup;