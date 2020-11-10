import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { CartContext, UserContext } from "./contexts/Context";
import Topmenu from "./components/TopMeu";
import Footer from "./components/Footer";
import HomePgae from "./pages/Home";
import CartPage from "./pages/Cart";
import ToTop from './components/ToTop';
function App(props) {
  const [userCart, setUserCart] = useState([]);
  const [user, setUser] = useState(null);
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
    <UserContext.Provider value={{ user, setUser }}>
      <Router>
      <Topmenu />
        <Switch>
          <Route path="/" exact component={HomePgae} />
          <Route path="/cart" component={CartPage} />
        </Switch>
        <Footer />
        <ToTop />
      </Router>
    </UserContext.Provider>
    </CartContext.Provider>
  );
}

export default App;
