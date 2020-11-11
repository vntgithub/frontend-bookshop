import React, { useState } from 'react';
import { useContext } from 'react';
import { Container, Row, Col, Alert } from 'reactstrap';
import { CartContext, ModalLoginContext } from "../contexts/Context";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { faMinusCircle } from '@fortawesome/free-solid-svg-icons';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import InvoiceForm from '../components/InvoiceForm';

import './style/cart.css';

const CartPage = () => {
    const { userCart, setUserCart } = useContext(CartContext);
    const { login, setLogin } = useContext(ModalLoginContext);
    const [isOpen, setIsOpen] = useState(false);
    let count = 0, totalAmount = 0;
    for(let i = 0; i < userCart.length; i++){
        count += userCart[i].count;
        totalAmount += (userCart[i].count * userCart[i].item.price);
    };
    const deleteItem = (index) => {
        return function() {
            const newCart = userCart.filter((element, i) => i !== index);
            setUserCart(newCart);
            localStorage.setItem('cartItems', JSON.stringify(newCart));
        }
    }
    const plusItem = (index) => {
        return function () {
            const newCart = [...userCart];
            newCart[index].count += 1;
            setUserCart(newCart);
            localStorage.setItem('cartItems', JSON.stringify(newCart));
        }
    }
    const minusItem = (index) => {
        return function() {
            const newCart = [...userCart];
            newCart[index].count -= 1;
            if(newCart[index].count === 0){
                const del = deleteItem(index);
                del();
            }else{
                setUserCart(newCart);
                localStorage.setItem('cartItems', JSON.stringify(newCart));
            }
            
        }
    }
    const toggle = () => {
        if(userCart.length === 0){
            document.getElementById('warning').style.visibility = "unset";
            return;
        }
        setIsOpen(!isOpen);
    }
    const buy = () => {
        if(document.cookie === ''){
            setLogin(!login);
            return;
        }
        toggle();
    }
    return (
        <Container className="container-cartpage">
            {isOpen && <InvoiceForm toggle={toggle} />}
            <Row className="total">
                <Col sm={3}>Cart</Col>
                <Col sm={{size: 2, offset: 4}}>Products: {count}</Col>
                <Col sm={{size: 2}}>
                Capital-sum: {parseFloat(totalAmount).toPrecision(4)} $
                </Col>
                
            </Row>
            <Row className="header">
                <Col sm={1}>#</Col>
                <Col sm={2}>Image product</Col>
                <Col sm={2}>Name</Col>
                <Col sm={2}>Price</Col>
                <Col sm={2}>Count</Col>
                <Col sm={2}>Total amount </Col>
                <Col sm={1}>Delete</Col>
            </Row>
            {userCart.map((element, index) => {
                return(
                <Row key={index} className="body-table">
                    <Col sm={1} className="index">{index}</Col>
                    <Col sm={2}>
                        <img src={element.item.urlimg} alt="productImg" />
                    </Col>
                    <Col sm={2} className="name-product">{element.item.name}</Col>
                    <Col sm={2} className="price-product">$ {element.item.price}</Col>
                    <Col sm={2} className="count">
                        <FontAwesomeIcon className="sgv" icon={faMinusCircle} onClick={minusItem(index)} />
                        {element.count}
                        <FontAwesomeIcon className="sgv" icon={faPlusCircle} onClick={plusItem(index)} />
                    </Col>
                    <Col sm={2} className="price-product">$ {parseFloat(element.count*element.item.price).toPrecision(4)}</Col>
                    <Col sm={1}>
                        <FontAwesomeIcon className="sgv" icon={faTrashAlt} onClick={deleteItem(index)} />
                    </Col>
                </Row>);
            }
            )}
            <Row className="capital-sum">
               <Col sm={{size: 3, offset: 9}}>
                   <p>Capital-sum:</p>
                   <h6>{parseFloat(totalAmount).toPrecision(4)} $</h6>
               </Col>
            </Row>
            <Row className="buy">
                <Col id="warning" style={{visibility: "hidden"}} sm={{size: 4, offset: 5}}>
                    <Alert style={{margin: 0}} color="warning">
                        Cart is empty!
                    </Alert>
                </Col>
                <Col sm={{size: 3}}>
                    <button onClick={buy}>Buy</button>
                </Col>
            </Row>
           
        </Container>
    );
}

export default CartPage;