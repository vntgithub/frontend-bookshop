import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import CartContext from "./contexts/cart.context";
import LoginPage from "./pages/Login";
import HomePgae from "./pages/Home";
import CartPage from "./pages/Cart";
import { useEffect } from "react";

function App(props) {
  const [userCart, setUserCart] = useState([]);
  useEffect(() => {
    if(localStorage.getItem('cartItems')){
      const arrayItems = JSON.parse(localStorage.getItem('cartItems'));
      setUserCart(arrayItems);
    }else{
      localStorage.setItem('cartItems', []);
    }
  }, []);
  return (
    <CartContext.Provider value={{ userCart, setUserCart }}>
      <Router>
        <Switch>
          <Route path="/" exact component={HomePgae} />
          <Route path="/login" exact component={LoginPage} />
          <Route path="/cart" component={CartPage} />
        </Switch>
      </Router>
      </CartContext.Provider>
  );
}

export default App;
