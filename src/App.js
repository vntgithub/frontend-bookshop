import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { CartContext, 
          UserContext, 
          ModalLoginContext, 
          MessContext, AdminContext } from "./contexts/Context";

import HomePage from "./pages/Home";
import CartPage from "./pages/Cart";
import MyInvoice from "./pages/MyInvoice";
import AdminPage from "./pages/Admin";
import LoginAdmin from "./pages/LoginAdmin";

import ModalLogin from './components/ModalLogin';
import ModalSignUp from './components/ModalSignup';
import Topmenu from "./components/TopMeu";
import Footer from "./components/Footer";
import ToTop from './components/ToTop';
import Mess from './components/Mess';

import userApi from "./api/user.api";


function App() {
  const [admin, setAdmin] = useState({});
  const [userCart, setUserCart] = useState([]);
  const [user, setUser] = useState({});
  const [login, setLogin] = useState(false);
  const [signup, setSignup] = useState(false);
  const [mess, setMess] = useState('');
  const [isopenMess, setIsOpenMess] = useState(false);
  useEffect(() => {
   const componentDidMount = async () => {

    if(document.cookie.indexOf('iduser') !== -1){
      const arrCookie = document.cookie.split(';');
      const adminStrCookie = arrCookie.find(e => e.substr(0,6) === 'iduser');
      const cookie = adminStrCookie.substr(7);
      await userApi.getByCookie(cookie, setUser);
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
  const openMess = (m) => {
    setMess(m);
    setIsOpenMess(true)
    setTimeout(() => setIsOpenMess(false),1500);
    console.log("done");
}
  return (
    <div id="App">
      {isopenMess && <Mess mess={mess} setIsOpenMess={setIsOpenMess}/>}
      <AdminContext.Provider value={{admin, setAdmin}}>
      <MessContext.Provider value={openMess}>
      <CartContext.Provider value={{ userCart, setUserCart }}>
        <UserContext.Provider value={{ user, setUser }}>
          <Router>
            {document.URL.substr(document.URL.lastIndexOf('/')) !== '/loginadmin' && <Topmenu openModalLogin={openModalLogin} setUserState={setUser}/>}
            {login&&<ModalLogin openModalLogin={openModalLogin} openModalSignUp={openModalSignUp} />}
            {signup && <ModalSignUp openModalSignUp={openModalSignUp} />}
            <Switch>
              <Route path="/" exact component={HomePage} />
              <Route path="/myinvoice" exact component={MyInvoice} />
              <Route path="/admin" exact component={AdminPage} />
              <Route path="/loginadmin" exact component={LoginAdmin} />
              <ModalLoginContext.Provider value={{ login, setLogin }}>
                <Route path="/cart" component={CartPage} />
              </ModalLoginContext.Provider>
            </Switch>
              {document.URL.substr(document.URL.lastIndexOf('/')) !== '/loginadmin' && <Footer />}
            {document.URL.substr(document.URL.lastIndexOf('/')) !== '/loginadmin' && <ToTop />}
          </Router>
        </UserContext.Provider>
      </CartContext.Provider>
      </MessContext.Provider>
      </AdminContext.Provider>

    </div>
  );
}

export default App;
