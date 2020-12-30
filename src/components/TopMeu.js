import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

import "./style/TopMenu.css";
import { CartContext, AdminContext, UserContext, isOpenUpdateInfContext } from '../contexts/Context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';


const TopMenu = (props) => {
  const currentPath = document.URL.substr(document.URL.lastIndexOf('/') + 1);
  const {openUpdateInf} = useContext(isOpenUpdateInfContext);
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useContext(UserContext);
  const { admin, setAdmin } = useContext(AdminContext);
  let urlimg = '';
  if(currentPath === 'Admin'){
    urlimg = admin.urlimg;
  }else{
    urlimg = user.urlimg;
  }
  const { userCart } = useContext(CartContext);
  const toggle = () => setIsOpen(!isOpen);
  let count = 0;
  for(let i = 0; i < userCart.length; i++){
    count += userCart[i].count;
  };
  const logout = () => {
    if(currentPath === 'Admin'){
      document.cookie = "idadmin=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/Admin;";
      setAdmin({});
      window.location.replace('/loginadmin');
    }else{
      document.cookie = "iduser=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      props.setUserState({});
    }
  }
  
  const item1 = <UncontrolledDropdown nav inNavbar>
                    <DropdownToggle nav caret>
                      <img 
                      style={{width: "2.5rem", height: "2.5rem"}} 
                      src={urlimg} alt="userimg"
                      className="userAvt" />
                      </DropdownToggle>
                      <DropdownMenu right>
                    <DropdownItem onClick={openUpdateInf}>
                          <p>My information</p>
                        </DropdownItem>
                        { (currentPath !== 'Admin') && <Link to="/myinvoice">
                          <DropdownItem>
                            My invoice
                          </DropdownItem>
                        </Link>}
                        <DropdownItem divider />
                        <DropdownItem onClick={logout}>
                          <p>Logout</p>
                        </DropdownItem>
                      </DropdownMenu>
                  </UncontrolledDropdown>;
  const item2 = <NavItem >
                  <div >
                    <p onClick={props.openModalLogin} 
                      className="login-signup">
                        Login / Signup
                    </p>
                  </div>
              </NavItem>
  const getItem = () => {
    const checkuser = document.cookie.indexOf('iduser');
    const checkadmin = document.cookie.indexOf('idadmin');
    if(currentPath !== 'Admin'){
      if(checkuser !== -1)
          return item1
      else
        return item2
    }else{
      if(checkadmin !== -1)
          return item1
      else
        return item2
    }
    
  }
  return (
    
    <div>
      
      <Navbar fixed="top" color="light" light expand="md">
        <NavbarBrand href="/">
          <div className="logo">BookShop</div>
        </NavbarBrand>

        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
           {window.location.href.indexOf('Admin') === -1 &&
            <NavItem>
              <div className="cart">
                <Link className="link" to="/cart">
                  <FontAwesomeIcon icon={faCartPlus} size="2x" />
                </Link>
                  <span className="numberItems">{count}</span>
              </div>
            </NavItem> 
            
          }
            {
              getItem()
            }
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default TopMenu;
