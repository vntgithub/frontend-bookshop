import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Input } from 'reactstrap';
import classNames from 'classnames';
import invoiceApi from '../api/invoice.api';

import InvoiceForm from '../components/InvoiceForm';
import './style/myinvoice.css';

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
    const cancel = (id) => {
        return () => {
            invoiceApi.updateState(id, 'Cancel');
        }
    }
    const filterState = (e) => {
        if(e.target.value === 'All'){
            invoiceApi.getInvoiceByUserId(document.cookie.substr(3))
            .then(res => setInvoice(res.data));
            return;
        }
        invoiceApi.getByState(document.cookie.substr(3), e.target.value)
        .then(res => setInvoice(res.data));
    }
    useEffect(() => {
        invoiceApi.getInvoiceByUserId(document.cookie.substr(3))
        .then(res => {
            setInvoice(res.data);
        });
    }, []);
    return(
        <Container className="body-invoice-list">
            <Row className="justify-content-center ">
                <Col>
                    <Input type="text" placeholder="Search id..." />
                </Col>
                <Col>
                <Input type="select" onChange={filterState}>
                    <option>All</option>
                    <option>Done</option>
                    <option>Delivering</option>
                    <option>Waitting</option>
                    <option>Cancel</option>
                </Input>
                </Col>
            </Row>
            {isOpen && <InvoiceForm toggle={toggle} invoiceBuyAgain={invoiceBuyAgain} />}
            {invoice.map((item, index) => 
                <Container className="invoice-item" key={index}>
                    <Row className="justify-content-center m-3 date-time">
                    Date time: {item.date}
                    </Row>
                <Row className="m-3 header-invoice-item">
                    <Col md={6}>
                        ID: {item._id}
                    </Col>
                    <Col md={{size: 3, offset: 3}} className="justify-content-right state">
                        State: <span className={
                            classNames(
                                {'state-done': item.state === 'Done'},
                                {'state-waitting': item.state === 'Waitting'},
                                {'state-cancel': item.state === 'Cancel'},
                                {'state-delivering': item.state === 'Delivering'}
                                )
                            }>{item.state}</span>
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
                    {item.state === 'Waitting' ? <Col md={{size: 3, offset: 6}}>
                        <button id="cancel-button" onClick={cancel(item._id)}>Cancel</button>
                    </Col> : <Col md={{size: 3, offset: 6}}></Col>}
                    <Col md={{size: 3}}>
                        <button onClick={eventOnclick(index)}>Buy again</button>
                    </Col>
                </Row>
            </Container>
            )}
        </Container>
    );
}

export default MyInvoice;