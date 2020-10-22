import React, { Component } from 'react';

export const cartContext = React.createContext();

export class cartProvider extends Components {
    constructor(props) {
        super(props);

        this.state = {
            cartItems: []
        };
        this.addToCard.bind(this);
    }
    addToCart(book) {
        this.setState({
            cartItems: this.state.cartItems.concat(book)
        });
    }
    render() {
        return (
            <cartProvider value={{
                cartItems: this.state.cartItems,
                addToCard: this.addToCard
            }}>
                {this.props.children}
            </cartProvider>
        );
    }
}