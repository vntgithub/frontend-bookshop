import React, { useState, useContext } from 'react';
import { Container, FormGroup, Input, Form, Row, Col } from 'reactstrap';

import userApi from '../api/user.api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle, faTimes
} from '@fortawesome/free-solid-svg-icons';
import './style/modallogin.css';
import { UserContext } from '../contexts/Context';

const ModalLogin = (props) => {
    const { setUser } = useContext(UserContext);
    const [data, setData] = useState({
        username: '', 
        password: '', 
    });
    const setUsername = (event) => setData({...data, username: event.target.value})
    const setPassword = (event) => setData({...data, password: event.target.value});
    const submit = async () => {
        let check = true;
        if(data.username === ''){
            check &= false;
            document.getElementById('username').style.display = "flex";
        }else{
            document.getElementById('username').style.display = "none";
        }
        if(data.password === ''){
            check &= false;
            document.getElementById('password').style.display = "flex";
            
        }else{
                document.getElementById('password').style.display = "none";
        }
        if(check) {
            if(! await userApi.login(data, setUser)){
                document.getElementById('check-exist').style.display = "flex";
                return;
            }else{
                document.getElementById('check-exist').style.display = "none";
                props.openModalLogin();
            }
            
        }
        
        return;
    }
    return(
        <div>
        <div className="overlay"></div>
        <Container className="login-form">
            <FontAwesomeIcon icon={faTimes} className="exit exit-login" onClick={props.openModalLogin} />
            <Row className="justify-content-center m-2">
                <h1 className="title-login">Login</h1>
            </Row>
            <Row className="justify-content-center">
                <Col sm={8}>
                    <Form onSubmit={submit}>
                        <FormGroup>
                            
                            <Input onChange={setUsername} name="username" type="text" placeholder="Username" />
                            <div id="username" className="require">
                                <FontAwesomeIcon icon={faExclamationCircle} />
                                <p>Username is require</p>
                            </div>                           
                            <Input 
                                onChange={setPassword} 
                                name="password" 
                                type="password" 
                                placeholder="Password"
                                className="mt-3" />
                            <div id="password" className="require">
                                <FontAwesomeIcon icon={faExclamationCircle} />
                                <p>Password is require</p>
                            </div>
                        </FormGroup>
                    </Form>
                </Col>
            </Row>
            <Row className="justify-content-center mb-2">
                <div id="check-exist" className="require">
                    <FontAwesomeIcon icon={faExclamationCircle} />
                    <p>Username or password is wrong</p>
                </div>
            </Row>
            <Row className="justify-content-center mb-2">
                <h4 className="mt-5 button-login" onClick={submit} >Submit</h4>
            </Row>
            <Row className="justify-content-center mb-2">
                <p className="mt-5 link-signup" onClick={props.openModalSignUp} >Don't have accout?</p>
            </Row>
        </Container>
        </div>
        
    );
}
export default ModalLogin;