import React, { useContext, useState, useEffect } from 'react';
import { Container, Row, Col } from 'reactstrap';
import invoiceApi from '../api/invoice.api';

import InvoiceForm from '../components/InvoiceForm';
import './style/invoice.css';

const MyInvoice = () => {
    const [invoice, setInvoice] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [invoiceBuyAgain, setInvoiceBuyAgain] = useState(null);
    const toggle = () => setIsOpen(!isOpen);
    const eventOnclick = (index) => {
        return () => {
            setInvoiceBuyAgain(invoice[index]);
            toggle();
        }
    }
    useEffect(() => {
        invoiceApi.getInvoiceByUserId(document.cookie.substr(3))
        .then(res => {
            setInvoice(res.data);
        });
    }, []);
    return(
        <Container className="body-invoice-list">
            {isOpen && <InvoiceForm toggle={toggle} invoiceBuyAgain={invoiceBuyAgain} />}
            {invoice.map((item, index) => 
                <Container className="invoice-item" key={index}>
                    <Row className="justify-content-center m-3">
                    Date time: {item.date}
                    </Row>
                <Row className="m-3 header-invoice-item">
                    <Col md={6}>
                        ID: {item._id}
                    </Col>
                    <Col md={{size: 3, offset: 3}} className="justify-content-right">
                        State: Delevered
                    </Col>
                </Row>
                
                {item.cart.map((book, i) => 
                    <Row className=" m-3 body-invoice-item" key={i}>
                    <Col>
                        <img 
                        src={book.item.urlimg} 
                        alt="img-product"
                        className="img-invoice-item" />
                    </Col>
                    <Col className="name-product">
                        {book.item.name}
                    </Col>
                    <Col className="count">x {book.count}</Col>
                    <Col className="price-product">$ {book.item.price}</Col>
                </Row>
                )}
                <Row className="m-3">
                   <Col className="capital-sum-invoice-item" md={{size: 3, offset: 9}}>
                   <p>Capital-sum:</p>
                   <h6>{item.totalamount} $</h6>
                   </Col>
                </Row>
                <Row className="m-3 buy">
                    <Col md={{size: 3, offset: 9}}>
                        <button onClick={eventOnclick(index)}>Buy again</button>
                    </Col>
                </Row>
            </Container>
            )}
        </Container>
    );
}

export default MyInvoice;