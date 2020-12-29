import React, { useState, useContext } from 'react';
import { Container, FormGroup, Input, Label, Form, Row, Col } from 'reactstrap';

import invoiceApi from '../api/invoice.api';
import { CartContext, MessContext, UserContext } from '../contexts/Context';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle, faTimes
} from '@fortawesome/free-solid-svg-icons';
import './style/invoiceform.css';

const UpdateInfForm = (props) => {
    const openMess = useContext(MessContext);
    const [image, setImage] = useState(null);
    const { user } = useContext(UserContext);
    const [data, setData] = useState({
        userId: document.cookie.substr(3),
        name: user.name, 
        phonenumber: user.phonenumber, 
        address: user.address,
        newPass: '',
        confirmNewPass: ''
    });
    const setName = (event) => setData({...data, name: event.target.value})
    const setPhone = (event) => setData({...data, phonenumber: event.target.value});
    const setAddress = (event) => setData({...data, address: event.target.value});
    const setNewPass = (event) => setData({...data, newPass: event.target.value});
    const setConfirmNewPass = (event) => setData({...data, confirmNewPass: event.target.value});
    const submit = () => {
        const RegExp = /^0[1-9]{9,10}$/;
        let check = true;
        if(data.name === ''){
            check &= false;
            document.getElementById('name').style.display = "flex";
        }else{
            document.getElementById('name').style.display = "none";
        }
        if(data.phone === ''){
            check &= false;
            document.getElementById('phone').style.display = "flex";
            
        }else{
            if(RegExp.test(data.phonenumber)){
                document.getElementById('phone').style.display = "none";
            }else{
                check &= false;
                document.getElementById('phone').children[1].innerHTML= "Phone numbers must begin with 0, have 10-11 numbers";
                document.getElementById('phone').style.display = "flex";
            }
        }
        if(data.address === ''){
            check &= false;
            document.getElementById('address').style.display = "flex";
        }else{
            document.getElementById('address').style.display = "none";
        }
        if(data.urlimg === ''){
            check &= false;
            document.getElementById('image').style.display = "flex";
        }else{
            document.getElementById('image').style.display = "none";
        }
        if(check)
            
        }
        return;
    }
    const getImage = (e) => {
        const file = e.target.files;
        const imageData  = new FormData();
        imageData.append('file', file[0]);
        imageData.append('upload_preset', 'usersimage');
        setImage(imageData);
        //Review img
        var reader = new FileReader();
        reader.onload = function (e) {
                document.getElementById("blah").src = e.target.result;
            };

        reader.readAsDataURL(file[0]);
    }
    return(
        <div>
        <div className="overlay"></div>
        <Container className="invoice-form">
            <FontAwesomeIcon icon={faTimes} className="exit" onClick={props.toggle} />
            <Row className="justify-content-center m-2">
                <h1 className="title-information">Shipment details</h1>
            </Row>
            <Row className="justify-content-center">
                <Col sm={6}>
                    <Form onSubmit={submit}>
                        <FormGroup>
                            <Label>Name</Label>
                            <Input onChange={setName} name="name" type="text" value={data.name} />
                            <div id="name" className="require">
                                <FontAwesomeIcon icon={faExclamationCircle} />
                                <p>Name is require</p>
                            </div>
                            <div className="err">{}</div>
                            <Label>Phone numbers</Label>
                            <Input onChange={setPhone} name="phone" type="text" value={data.phonenumber} />
                            <div id="phone" className="require">
                                <FontAwesomeIcon icon={faExclamationCircle} />
                                <p>Phone is require</p>
                            </div>
                            <Label>Address</Label>
                            <Input onChange={setAddress} name="address" type="text" value={data.address} />
                            <div id="address" className="require">
                                <FontAwesomeIcon icon={faExclamationCircle} />
                                <p>Address is require</p>
                            </div>
                            <Label>New password</Label>
                            <Input onChange={setAddress} name="np" type="password"  />
                            <div id="npass" className="require">
                                <FontAwesomeIcon icon={faExclamationCircle} />
                                <p>Address is require</p>
                            </div>
                            <Label>Confirm new password</Label>
                            <Input onChange={setConfirmNewPass} name="np" type="password"  />
                            <div id="cnpass" className="require">
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
                                id="blah" 
                                src={data.urlimg} 
                                alt="imgproduct"
                                width="120px"
                                height="180px" />
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
export default UpdateInfForm;