import React, { useState, useContext } from 'react';
import { Container, FormGroup, Input, Label, Form, Row, Col } from 'reactstrap';

import userApi from '../api/user.api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { UserContext } from '../contexts/Context';
import { faExclamationCircle, faTimes
} from '@fortawesome/free-solid-svg-icons';

import './style/modallogin.css';

const ModalSigup = (props) => {
    const [data, setData] = useState({
        username: '', 
        password: '', 
        confirm: '',
        name: '',
        phonenumber: '',
        adress: '',
        urlimg: ''
    });
    const setUsername = (event) => setData({...data, username: event.target.value})
    const setPassword = (event) => setData({...data, password: event.target.value});
    const setConfirm = (event) => setData({...data, confirm: event.target.value});
    const setName = (event) => setData({...data, name: event.target.value});
    const setPhone = (event) => setData({...data, phonenumber: event.target.value});
    const setAdress = (event) => setData({...data, adress: event.target.value});


    const submit = () => {
        let check = true;
        const RegExp = /^0[1-9]{9,10}$/;
        if(data.username === ''){
            check &= false;
            document.getElementById('usernameSU').style.display = "flex";
        }else{
            document.getElementById('usernameSU').style.display = "none";
        }
        if(data.password === ''){
            check &= false;
            document.getElementById('passwordSU').style.display = "flex";
            
        }else{
                document.getElementById('passwordSU').style.display = "none";
        }
        if(data.confirm === ''){
            check &= false;
            document.getElementById('confirm-pass').style.display = "flex"; 
        }else {
            if(data.confirm === data.password){
                document.getElementById('confirm-pass').style.display = "none";
            }else { 
                check &= false;
                document.getElementById('confirm-pass').children[1].innerHTML = "Those passwords didn't match. Try again.";
                document.getElementById('confirm-pass').style.display = "flex";
            }
            
        }
        if(data.name === ''){
            check &= false;
            document.getElementById('name').style.display = "flex"; 
        }else {
            document.getElementById('name').style.display = "none";
        }
        if(data.phonenumber === ''){
            check &= false;
            document.getElementById('phone').style.display = "flex"; 
        }else {
            if(RegExp.test(data.phonenumber)){
                document.getElementById('phone').style.display = "none";
            }else{
                check &= false;
                document.getElementById('phone').children[1].innerHTML= "Phone numbers must begin with 0, have 10-11 numbers";
                document.getElementById('phone').style.display = "flex";
            }
        }
        if(data.adress=== ''){
            check &= false;
            document.getElementById('adress').style.display = "flex"; 
        }else {
            document.getElementById('adress').style.display = "none";
        }

        if(check) {
            userApi.create(data);
            props.openModalSignUp();
        }
        return;
    }
    return(
        <div>
        <div className="overlay"></div>
        <Container className="login-form">
            <FontAwesomeIcon icon={faTimes} className="exit" onClick={props.openModalSignUp} />
            <Row className="justify-content-center m-2">
                <h1 className="title-information">SignUp</h1>
            </Row>
            <Row className="justify-content-center">
                <Col sm={10}>
                    <Form onSubmit={submit}>
                        <FormGroup>
                            <Input 
                            onChange={setUsername} 
                            type="text" 
                            placeholder="Username"
                            className="mt-3" />
                            <div id="usernameSU" className="require">
                                <FontAwesomeIcon icon={faExclamationCircle} />
                                <p>Username is require</p>
                            </div>
                            <Input 
                            onChange={setPassword} 
                            type="password" 
                            placeholder="Password"
                            className="mt-3" />
                            <div id="passwordSU" className="require">
                                <FontAwesomeIcon icon={faExclamationCircle} />
                                <p>Password is require</p>
                            </div>
                            <Input 
                            onChange={setConfirm} 
                            type="password" 
                            placeholder="Confirm password"
                            className="mt-3" />
                            <div id="confirm-pass" className="require">
                                <FontAwesomeIcon icon={faExclamationCircle} />
                                <p>Confirm password is require</p>
                            </div>
                            <Input 
                            onChange={setName}
                            type="text" 
                            placeholder="Name" 
                            className="mt-3" />
                            <div id="name" className="require">
                                <FontAwesomeIcon icon={faExclamationCircle} />
                                <p>Name is require</p>
                            </div>
                            <Input 
                            onChange={setPhone}
                            type="text" 
                            placeholder="Phone numbers" 
                            className="mt-3" />
                            <div id="phone" className="require">
                                <FontAwesomeIcon icon={faExclamationCircle} />
                                <p>Phone numbers is require</p>
                            </div>
                            <Input 
                            onChange={setAdress}
                            type="text" 
                            placeholder="Adress" 
                            className="mt-3" />
                            <div id="adress" className="require">
                                <FontAwesomeIcon icon={faExclamationCircle} />
                                <p>Adress is require</p>
                            </div>
                            <Input 
                            name="image" 
                            type="file" 
                            placeholder="Choose Image" c
                            lassName="mt-3"
                            accept="image/*" className="mt-3" />
                            <div id="image" className="require">
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