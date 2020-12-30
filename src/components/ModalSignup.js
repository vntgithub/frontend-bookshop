import React, { useState } from 'react';
import { Container, FormGroup, Input, Form, Row, Col } from 'reactstrap';

import userApi from '../api/user.api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle, faTimes
} from '@fortawesome/free-solid-svg-icons';

import './style/modallogin.css';
import Axios from 'axios';

const ModalSigup = (props) => {
    const [image, setImage] = useState(null);
    const [dataForm, setDataForm] = useState({
        username: '', 
        password: '', 
        confirm: '',
        name: '',
        phonenumber: '',
        address: '',
        urlimg: ''
    });
    const setUsername = (event) => setDataForm({...dataForm, username: event.target.value})
    const setPassword = (event) => setDataForm({...dataForm, password: event.target.value});
    const setConfirm = (event) => setDataForm({...dataForm, confirm: event.target.value});
    const setName = (event) => setDataForm({...dataForm, name: event.target.value});
    const setPhone = (event) => setDataForm({...dataForm, phonenumber: event.target.value});
    const setAddress = (event) => setDataForm({...dataForm, address: event.target.value});
    const getImage = (e) => {
        const file = e.target.files;
        const imageData  = new FormData();
        imageData.append('file', file[0]);
        imageData.append('upload_preset', 'usersimage');
        setImage(imageData);
        //Review
        var reader = new FileReader();
        reader.onload = function (e) {
                document.getElementById("rv").src = e.target.result;
                document.getElementById("rv").style.display = "flex";
            };

        reader.readAsDataURL(file[0]);
    }


    const submit = () => {
        let check = true;
        const RegExp = /^0[1-9]{9,10}$/;
        if(dataForm.username === ''){
            check &= false;
            document.getElementById('usernameSU').children[1].innerHTML = "Username is require";
            document.getElementById('usernameSU').style.display = "flex";
        }else{
             userApi.checkExist(dataForm.username).then(res => {
                check &= false;
                if(res.data.checkUserExist){
                    document.getElementById('usernameSU').children[1].innerHTML = "Account already exists";
                    document.getElementById('usernameSU').style.display = "flex";
                }else{
                    document.getElementById('usernameSU').style.display = "none";
                }
            });
            
            
        }
        if(dataForm.password === ''){
            check &= false;
            document.getElementById('passwordSU').style.display = "flex";
            
        }else{
                document.getElementById('passwordSU').style.display = "none";
        }
        if(dataForm.confirm === ''){
            check &= false;
            document.getElementById('confirm-pass').style.display = "flex"; 
        }else {
            if(dataForm.confirm === dataForm.password){
                document.getElementById('confirm-pass').style.display = "none";
            }else { 
                check &= false;
                document.getElementById('confirm-pass').children[1].innerHTML = "Those passwords didn't match. Try again.";
                document.getElementById('confirm-pass').style.display = "flex";
            }
            
        }
        if(dataForm.name === ''){
            check &= false;
            document.getElementById('name').style.display = "flex"; 
        }else {
            document.getElementById('name').style.display = "none";
        }
        if(dataForm.phonenumber === ''){
            check &= false;
            document.getElementById('phone').style.display = "flex"; 
        }else {
            if(RegExp.test(dataForm.phonenumber)){
                document.getElementById('phone').style.display = "none";
            }else{
                check &= false;
                document.getElementById('phone').children[1].innerHTML= "Phone numbers must begin with 0, have 10-11 numbers";
                document.getElementById('phone').style.display = "flex";
            }
        }
        if(dataForm.address=== ''){
            check &= false;
            document.getElementById('address').style.display = "flex"; 
        }else {
            document.getElementById('address').style.display = "none";
        }
        if(!image){
            check &= false;
            document.getElementById('image').style.display = "flex";
        }else{
            document.getElementById('image').style.display = "none";
        }
        if(check) {
            Axios.post('https://api.cloudinary.com/v1_1/vntrieu/image/upload', image)
            .then(res => {
                const userCreate = {...dataForm, urlimg: res.data.secure_url}
                userApi.create(userCreate).then(() => {
                    document.getElementById('donesu').style.display = "flex";
                    setTimeout(() => props.openModalSignUp(), 1500);
                });
                
            });
            
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
                            onChange={setAddress}
                            type="text" 
                            placeholder="Address" 
                            className="mt-3" />
                            <div id="address" className="require">
                                <FontAwesomeIcon icon={faExclamationCircle} />
                                <p>Address is require</p>
                            </div>
                            <Input 
                            id="imagedata"
                            name="image" 
                            type="file" 
                            placeholder="Choose Image"
                            className="mt-3"
                            accept="image/*"
                            onChange={getImage} />
                            <div id="image" className="require">
                                <FontAwesomeIcon icon={faExclamationCircle} />
                                <p>Image is require</p>
                            </div>
                            <img 
                                className="mt-3"
                                id="rv" 
                                src={dataForm.urlimg} 
                                alt="imgproduct"
                                width="120px"
                                height="180px" />
                        </FormGroup>
                    </Form>
                </Col>
            </Row>
            <Row id="donesu" className="justify-content-center mb-2 donesignup">
                <h4 className="mt-3 ">Signup sucessfully.</h4>
            </Row>
            <Row className="justify-content-center mb-2">
                <h4 className="mt-5 button-submit" onClick={submit} >Submit</h4>
            </Row>
        </Container>
        </div>
        
    );
}
export default ModalSigup;