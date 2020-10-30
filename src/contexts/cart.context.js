import React, { Component } from 'react';

export const CartContext = React.createContext();

export class CartProvider extends Component {
    constructor(props) {
        super(props);

        this.state = {
            cartItems: []
        };
        
        this.addToCart.bind(this);
    }
    addToCart(book) {
        console.log("Adding book: ", book);
        this.setState({
            cartItems: this.state.cartItems.concat(book)
        });
    }
    render() {
        return (
            <CartProvider value={{
                cartItems: this.state.cartItems,
                addToCard: this.addToCard
            }}>
                {this.props.children}
            </CartProvider>
        );
    }
}