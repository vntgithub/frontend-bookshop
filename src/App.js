import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { CartContext, UserContext, ModalLoginContext } from "./contexts/Context";
import ModalLogin from './components/ModalLogin';
import ModalSignUp from './components/ModalSignup';
import Topmenu from "./components/TopMeu";
import Footer from "./components/Footer";
import HomePgae from "./pages/Home";
import CartPage from "./pages/Cart";
import MyInvoice from "./pages/MyInvoice";
import ToTop from './components/ToTop';
import userApi from "./api/user.api";
function App() {
  const [userCart, setUserCart] = useState([]);
  const [user, setUser] = useState({});
  const [login, setLogin] = useState(false);
  const [signup, setSignup] = useState(false);
  useEffect(() => {
   const componentDidMount = async () => {
    if(document.cookie !== ''){
      await userApi.getByCookie(document.cookie.substr(3), setUser);
    }
   }
   componentDidMount();
   if(localStorage.getItem('cartItems')){
    const arrayItems = JSON.parse(localStorage.getItem('cartItems'));
    setUserCart(arrayItems);
  }else{
    localStorage.setItem('cartItems', []);
  }
  }, []);
  const openModalLogin = () => setLogin(!login);
  const openModalSignUp = () => setSignup(!signup);
  return (
    
    <CartContext.Provider value={{ userCart, setUserCart }}>
    <UserContext.Provider value={{ user, setUser }}>
      <Router>
      <Topmenu openModalLogin={openModalLogin} setUserState={setUser}/>
      {login&&<ModalLogin openModalLogin={openModalLogin} openModalSignUp={openModalSignUp} />}
      {signup && <ModalSignUp openModalSignUp={openModalSignUp} />}
        <Switch>
          <Route path="/" exact component={HomePgae} />
          <Route path="/myinvoice" exact component={MyInvoice} />
          <ModalLoginContext.Provider value={{ login, setLogin }}>
            <Route path="/cart" component={CartPage} />
          </ModalLoginContext.Provider>
        </Switch>
        <Footer />
        <ToTop />
      </Router>
    </UserContext.Provider>
    </CartContext.Provider>
  );
}

export default App;
