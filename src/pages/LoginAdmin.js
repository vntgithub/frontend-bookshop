import React, { useState, useContext} from 'react';
import { Container, Form, Input, FormGroup, Button, Row, Col } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle, faTimes
} from '@fortawesome/free-solid-svg-icons';
import imgSVG from "../img/login.svg";
import "./style/LoginAdmin.css";
const LoginAdmin = (props) => {
    //const { setUser } = useContext(UserContext);
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
            
            
        }
        
        return;
    }
    return (
        <Container className="mt-5 wrapper-content-loginadmin"> 
            <Row>
                <Col>
                    <Form onSubmit={submit}>
                        <FormGroup>
                            <h2 className="mb-5 title-login-admin">Login Admin</h2>
                            <Input 
                                className="input-admin-login"
                                onChange={setUsername} 
                                name="username" 
                                type="text" 
                                placeholder="Username" />
                            <div id="username" className="require">
                                <FontAwesomeIcon icon={faExclamationCircle} className="mr-1 mt-1" />
                                <p>Username is require</p>
                            </div>                           
                            <Input 
                                className="input-admin-login"
                                onChange={setPassword} 
                                name="password" 
                                type="password" 
                                placeholder="Password"
                                className="mt-3" />
                            <div id="password" className="require">
                                <FontAwesomeIcon icon={faExclamationCircle} className="mr-1 mt-1" />
                                <p>Password is require</p>
                            </div>
                            <div id="check-exist" className="require">
                                <FontAwesomeIcon icon={faExclamationCircle} />
                                <p>Username or password is wrong</p>
                            </div>
                            <Button 
                                className="mt-4 button-login-admin"
                                onClick={submit}
                                >Submit</Button>
                        </FormGroup>
                        
                    </Form>
                    
                </Col>
                <Col>
                    <img src={imgSVG} alt="img" width="90%" height="90%" />
                </Col>
            </Row>
        </Container>
    )
}
export default LoginAdmin;