import React, { useState, useContext } from 'react';
import { Container, FormGroup, Input, Label, Form, Row, Col } from 'reactstrap';

import invoiceApi from '../api/invoice.api';
import CartContext from '../contexts/cart.context';
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
    const [err, setErr] = useState({name: false, phone: false, adress: false});
    const setName = (event) => setData({...data, name: event.target.value})
    const setPhone = (event) => setData({...data, phone: event.target.value});
    const setAdress = (event) => setData({...data, adress: event.target.value});
    const submit = () => {
        if(data.name === ''){
            setErr({...err, name:true});
            return;
        }
        const invoice = {
            ...data, 
        };
        console.log(invoice);
        invoiceApi.addInvoice(invoice);
        setUserCart([]);
        localStorage.setItem('cartItems', JSON.stringify([]));
    }
    return(
        <Container className="invoice-form">
            
            <Row className="justify-content-center m-2">
                <h1 className="title-information">Infomation</h1>
            </Row>
            <Row className="justify-content-center">
                <Col sm={6}>
                    <Form onSubmit={submit}>
                        <FormGroup>
                            <Label>Name</Label>
                            <Input onChange={setName} name="name" type="text" />
                            <div className="err">{}</div>
                            <Label>Phone</Label>
                            <Input onChange={setPhone} name="phone" type="text" />
                            <Label>Adress</Label>
                            <Input onChange={setAdress} name="adress" type="text" />
                            <Input className="mt-5" type="submit" onClick={submit} />
                        </FormGroup>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}
export default InvoiceForm;