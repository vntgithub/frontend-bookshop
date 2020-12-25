import React, { useState } from 'react';
import { Container, FormGroup, Input, Form, Row, Col, Label } from 'reactstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle, faTimes
} from '@fortawesome/free-solid-svg-icons';

import './style/modallogin.css';
import Axios from 'axios';
import bookApi from '../api/book.api';

const ModalUpdateBook = (props) => {
    const [image, setImage] = useState(null);
    const [dataForm, setDataForm] = useState({
        name: props.bookUpdate.name, 
        author: props.bookUpdate.author, 
        categogy: props.bookUpdate.categogy,
        price: props.bookUpdate.price,
        urlimg: props.bookUpdate.urlimg
    });
    const setName = (event) => setDataForm({...dataForm, name: event.target.value})
    const setAuthor = (event) => setDataForm({...dataForm, author: event.target.value});
    const setCategogy = (event) => setDataForm({...dataForm, categogy: event.target.value});
    const setPrice = (event) => setDataForm({...dataForm, price: event.target.value});
    const getImage = (e) => {
        const file = e.target.files;
        const imageData  = new FormData();
        imageData.append('file', file[0]);
        imageData.append('upload_preset', 'booksimage');
        setImage(imageData);
        //Review img
        var reader = new FileReader();
        reader.onload = function (e) {
                document.getElementById("blah").src = e.target.result;
            };

        reader.readAsDataURL(file[0]);
    }


    const submit = () => {
        let check = true;
        if(dataForm.name === ''){
            check &= false;
            document.getElementById('usernameSU').children[1].innerHTML = "Name is require";
            document.getElementById('usernameSU').style.display = "flex";
        }
        if(dataForm.author === ''){
            check &= false;
            document.getElementById('passwordSU').style.display = "flex";
            
        }else{
                document.getElementById('passwordSU').style.display = "none";
        }
        if(dataForm.categogy === ''){
            check &= false;
            document.getElementById('confirm-pass').style.display = "flex"; 
        }else {
            document.getElementById('confirm-pass').style.display = "none"; 
        }
       
        if(dataForm.price === ''){
            check &= false;
            document.getElementById('phone').style.display = "flex"; 
        }else {
            if(dataForm.price < 0){
                check &= false;
                document.getElementById('phone').children[1].innerHTML = " Price must > 0" 
                document.getElementById('phone').style.display = "flex"; 
            }else{
                document.getElementById('phone').style.display = "none"; 
            }
        }
        if(dataForm.urlimg === ''){
            check &= false;
            document.getElementById('image').style.display = "flex";
        }else{
            document.getElementById('image').style.display = "none";
        }
        if(check) {
            if(image){
                Axios.post('https://api.cloudinary.com/v1_1/vntrieu/image/upload', image)
                .then(res => {
                    const dataUpdate = {...dataForm, urlimg: res.data.secure_url}
                    bookApi.update(dataUpdate, props.bookUpdate['_id']);
                    //update data in page
                    const newItem = {...dataUpdate, _id: props.bookUpdate['_id']}
                    let newData = [...props.dataObj.data];
                    newData[props.dataObj.indexBookUpdate] = {...newItem};
                    props.dataObj.setData(newData);
                 });
            }else{
                bookApi.update(dataForm, props.bookUpdate['_id']).then(() => {
                    //update data in page
                    const newItem = {...dataForm, _id: props.bookUpdate['_id']}
                    let newData = [...props.dataObj.data];
                    newData[props.dataObj.indexBookUpdate] = {...newItem};
                    props.dataObj.setData(newData);
                });
            }
            close();
            props.openMess('Book updated.');
            
        }
        return;
    }
    const close = () => props.close(false);
    return(
        <div>
        <div className="overlay"></div>
        <Container className="login-form">
            <FontAwesomeIcon icon={faTimes} className="exit" onClick={close} />
            <Row className="justify-content-center m-2">
                <h1 className="title-information">Update Book</h1>
            </Row>
            <Row className="justify-content-center">
                <Col sm={10}>
                    <Form onSubmit={submit}>
                        <FormGroup>
                            <Label>Name: </Label>
                            <Input 
                            onChange={setName} 
                            value={dataForm.name}
                            type="text" 
                            placeholder="Name"
                            className="mb-3" />
                            <div id="usernameSU" className="require">
                                <FontAwesomeIcon icon={faExclamationCircle} />
                                <p>Name is require</p>
                            </div>
                            <Label>Author: </Label>
                            <Input 
                            onChange={setAuthor} 
                            type="text" 
                            value={dataForm.author}
                            className="mb-3" />
                            <div id="passwordSU" className="require">
                                <FontAwesomeIcon icon={faExclamationCircle} />
                                <p>Author is require</p>
                            </div>
                            <Label>Categogy: </Label>
                            <Input 
                            onChange={setCategogy} 
                            type="text" 
                            value={dataForm.categogy}
                            className="mb-3" />
                            <div id="confirm-pass" className="require">
                                <FontAwesomeIcon icon={faExclamationCircle} />
                                <p>Categogy is require</p>
                            </div>
                            <Label>Price: </Label>
                            <Input 
                            onChange={setPrice}
                            type="number" 
                            value={dataForm.price}
                            className="mb-3" />
                            <div id="phone" className="require">
                                <FontAwesomeIcon icon={faExclamationCircle} />
                                <p>Price is require</p>
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
                                src={dataForm.urlimg} 
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
export default ModalUpdateBook;