import React, { useState, useContext } from 'react';
import Axios from 'axios';
import { Container, FormGroup, Input, Label, Form, Row, Col, Button } from 'reactstrap';

import userApi from '../api/user.api';
import adminApi from '../api/admin.api';
import { AdminContext, isOpenUpdateInfContext, MessContext, UserContext } from '../contexts/Context';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle, faTimes, faEdit
} from '@fortawesome/free-solid-svg-icons';
import './style/invoiceform.css';

const UpdateInfForm = (props) => {
    const currentPath = document.URL.substr(document.URL.lastIndexOf('/') + 1);
    const {closeUpdateInf} = useContext(isOpenUpdateInfContext);
    const openMess = useContext(MessContext);
    const [image, setImage] = useState(null);
    const [newPassOb, setNewPassOb] = useState({newPass: '', confirmNewPass: ''});
    const { user, setUser } = useContext(UserContext);
    const { admin, setAdmin } = useContext(AdminContext);
    let dataob = {};
    if(currentPath !== 'Admin'){
        dataob = {...user};
    }else{
        dataob = {...admin};
    }
    const [data, setData] = useState({...dataob});
    const [isOpenChanePass, setIsOpenChangePass] = useState(false);
    const setName = (event) => setData({...data, name: event.target.value})
    const setPhone = (event) => setData({...data, phonenumber: event.target.value});
    const setAddress = (event) => setData({...data, address: event.target.value});
    const setNewPass = (event) => setNewPassOb({...newPassOb, newPass: event.target.value});
    const setConfirmNewPass = (event) => setNewPassOb({...newPassOb, confirmNewPass: event.target.value});
    const submit = () => {
        const RegExp = /^0[1-9]{9,10}$/;
        let check = true;
        if(currentPath !== 'Admin'){
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
        }
        if(isOpenChanePass){
            if(newPassOb.newPass === ''){
                document.getElementById('np').style.display = 'flex';
                check &= false;
            }else{
                document.getElementById('np').style.display = 'none';
            }
            if(newPassOb.confirmNewPass === ''){
                document.getElementById('cnp').style.display = 'flex';
                check &= false;
            }else{
                document.getElementById('cnp').style.display = 'none';
            }
            if(newPassOb.newPass !== newPassOb.confirmNewPass){
                document.getElementById('cnp').style.display = 'flex';
                document.getElementById('cnp').children[1].innerHTML = "Those passwords didn't match. Try again."
                check &= false;
            }else{
                if(newPassOb.confirmNewPass !== '')
                    document.getElementById('cnp').style.display = 'none';
            }
        }
        
        if(data.urlimg === ''){
            check &= false;
            document.getElementById('image').style.display = "flex";
        }else{
            document.getElementById('image').style.display = "none";
        }
        if(check){
            if(currentPath !== 'Admin'){
                if(image){
                    Axios.post('https://api.cloudinary.com/v1_1/vntrieu/image/upload', image)
                    .then(res => {
                        if(isOpenChanePass){
                            const dataUpdate = {...data, 
                                urlimg: res.data.secure_url,
                                password: newPassOb.newPass
                            };
                            userApi.update(dataUpdate);
                            delete dataUpdate.password;
                            setUser(dataUpdate);
                        }else{
                            const dataUpdate = {...data, urlimg: res.data.secure_url};
                            setUser(dataUpdate);
                            userApi.update(dataUpdate);
                        }
                        
                     });
                }else{
                    if(isOpenChanePass){
                        const dataUpdate = {...data, 
                            password: newPassOb.newPass
                        };
                        userApi.update(dataUpdate);
                        delete dataUpdate.password;
                        setUser(dataUpdate);
                    }else{
                        setUser(data);
                        userApi.update(data);
                    }
                }
                closeUpdateInf()
                openMess("Updated!");
            }else{
                if(image){
                    Axios.post('https://api.cloudinary.com/v1_1/vntrieu/image/upload', image)
                    .then(res => {
                        if(isOpenChanePass){
                            const dataUpdate = {...data, 
                                urlimg: res.data.secure_url,
                                password: newPassOb.newPass
                            };
                            adminApi.update(dataUpdate);
                            delete dataUpdate.password;
                            setAdmin(dataUpdate);
                        }else{
                            const dataUpdate = {...data, urlimg: res.data.secure_url};
                            setAdmin(dataUpdate);
                            adminApi.update(dataUpdate);
                        }
                        
                     });
                }else{
                    if(isOpenChanePass){
                        const dataUpdate = {...data, 
                            password: newPassOb.newPass
                        };
                        adminApi.update(dataUpdate);
                        delete dataUpdate.password;
                        setAdmin(dataUpdate);
                    }
                }
                closeUpdateInf()
                openMess("Updated!");
            }
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
                document.getElementById("avtifu").src = e.target.result;
            };

        reader.readAsDataURL(file[0]);
    }
    const openChangePass = () => setIsOpenChangePass(!isOpenChanePass);
    const clickButton = () => document.getElementById('imagedata').click();

    return(
        <div >
        <div className="overlay"></div>
        <Container className="invoice-form updateinf">
            <FontAwesomeIcon icon={faTimes} className="exit" onClick={closeUpdateInf} />
            <Row className="justify-content-center m-2">
                <h1 className="title-information">My information</h1>
            </Row>
            <Row className="justify-content-center">
                <Col sm={8}>
                    <Form onSubmit={submit}>
                        <FormGroup>
                            { (currentPath !== 'Admin') &&
                             <div>
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
                            </div>}
                            <div className="mt-2 changepass">
                                <Label>Change password </Label>
                                <FontAwesomeIcon icon={faEdit} className="ml-2" onClick={openChangePass} />
                            </div>
                            {isOpenChanePass && 
                                <div>
                                <Label>New password</Label>
                                <Input onChange={setNewPass} name="npass" type="password" />
                                <div id="np" className="require">
                                    <FontAwesomeIcon icon={faExclamationCircle} />
                                    <p>New password is require</p>
                                </div>
                                <Label>Confirm password</Label>
                                <Input onChange={setConfirmNewPass} name="cnpass" type="password"  />
                                <div id="cnp" className="require">
                                    <FontAwesomeIcon icon={faExclamationCircle} />
                                    <p>Confirm password is require</p>
                                </div>
                            </div>
                            }
                            <Button className="imgbutton mt-2 mr-5" onClick={clickButton}>Image</Button>
                            <img 
                                className="mt-3"
                                id="avtifu" 
                                src={data.urlimg} 
                                alt="imgproduct"
                                width="30%"
                                height="30%" />
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