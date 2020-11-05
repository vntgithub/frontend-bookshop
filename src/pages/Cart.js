import React from 'react';
import { useContext } from 'react';
import { Container, Row, Col } from 'reactstrap';
import CartContext from "../contexts/cart.context";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { faMinusCircle } from '@fortawesome/free-solid-svg-icons';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

import './style/cart.css';

const CartPage = () => {
    const { userCart, setUserCart } = useContext(CartContext);
    const deleteItem = (index) => {
        return function() {
            const newCart = userCart.filter((element, i) => i !== index);
            console.log(newCart);
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
            if(newCart[index].count == 0){
                const del = deleteItem(index);
                del();
            }else{
                setUserCart(newCart);
                localStorage.setItem('cartItems', JSON.stringify(newCart));
            }
            
        }
    }
    return (
        <Container>
            <h1>Cart</h1>
            <Row className="header">
                <Col sm={1}>#</Col>
                <Col sm={2}>Image product</Col>
                <Col sm={2}>Name</Col>
                <Col sm={2}>Price</Col>
                <Col sm={2}>Count</Col>
                <Col sm={2}>Total amount </Col>
                <Col sm={1}>Delete</Col>
            </Row>
            {userCart.map((element, index) => 
                <Row key={index}>
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
                </Row>
            )}
        </Container>
    );
}

export default CartPage;