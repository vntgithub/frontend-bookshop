import React, { useState, useContext } from 'react';
import { Container, FormGroup, Input, Label, Form, Row, Col } from 'reactstrap';

import invoiceApi from '../api/invoice.api';
import { CartContext } from '../contexts/Context';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle, faTimes
} from '@fortawesome/free-solid-svg-icons';
import './style/invoiceform.css';

const InvoiceForm = (props) => {
    const { userCart, setUserCart } = useContext(CartContext);
    const [data, setData] = useState({
        name: '', 
        phone: '', 
        adress: '',
        date: new Date(), 
        cart: [...userCart]
    });
    const setName = (event) => setData({...data, name: event.target.value})
    const setPhone = (event) => setData({...data, phone: event.target.value});
    const setAdress = (event) => setData({...data, adress: event.target.value});
    const submit = () => {
        const RegExp = /^0[1-9]{9,10}/;
        let check = true;
        if(data.name === ''){
            check &= false;
            document.getElementById('name').style.visibility = "unset";
        }else{
            document.getElementById('name').style.visibility = "hidden";
        }
        if(data.phone === ''){
            check &= false;
            document.getElementById('phone').style.visibility = "unset";
            
        }else{
            if(RegExp.test(data.phone)){
                document.getElementById('phone').style.visibility = "hidden";
            }else{
                check &= false;
                document.getElementById('phone').children[1].innerHTML= "Phone numbers must begin with 0, have 10-11 numbers";
                document.getElementById('phone').style.visibility = "unset";
            }
        }
        if(data.adress === ''){
            check &= false;
            document.getElementById('adress').style.visibility = "unset";
        }else{
            document.getElementById('adress').style.visibility = "hidden";
        }
        if(check) {
            const invoice = {
                ...data, 
            };
            console.log(invoice);
            invoiceApi.addInvoice(invoice);
            setUserCart([]);
            localStorage.setItem('cartItems', JSON.stringify([]));
            props.toggle();
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
                            <Label>Name</Label>
                            <Input onChange={setName} name="name" type="text" />
                            <div id="name" className="require">
                                <FontAwesomeIcon icon={faExclamationCircle} />
                                <p>Name is require</p>
                            </div>
                            <div className="err">{}</div>
                            <Label>Phone</Label>
                            <Input onChange={setPhone} name="phone" type="text" />
                            <div id="phone" className="require">
                                <FontAwesomeIcon icon={faExclamationCircle} />
                                <p>Phone is require</p>
                            </div>
                            <Label>Adress</Label>
                            <Input onChange={setAdress} name="adress" type="text" />
                            <div id="adress" className="require">
                                <FontAwesomeIcon icon={faExclamationCircle} />
                                <p>Adress is require</p>
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
export default InvoiceForm;