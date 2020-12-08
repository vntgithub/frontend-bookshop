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
import { CartContext, UserContext } from '../contexts/Context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus, faBell } from '@fortawesome/free-solid-svg-icons';


const TopMenu = (props) => {
  const { user } = useContext(UserContext);
  const [isOpen, setIsOpen] = useState(false);
  const { userCart } = useContext(CartContext);
  const toggle = () => setIsOpen(!isOpen);
  let count = 0;
  for(let i = 0; i < userCart.length; i++){
    count += userCart[i].count;
  };
  const logout = () => {
    document.cookie = "id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    props.setUserState(null);
  }
  const myInfo = () => {

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
           {window.location.href.indexOf('Admin') === -1 ?
            <NavItem>
              <div className="cart">
                <Link className="link" to="/cart">
                  <FontAwesomeIcon icon={faCartPlus} size="2x" />
                </Link>
                  <span className="numberItems">{count}</span>
              </div>
            </NavItem> :
            <NavItem>
              <div className="cart">
                  <FontAwesomeIcon icon={faBell} size="2x" style={{color: "#999"}} />
                  <span className="numberItems">{count}</span>
              </div>
            </NavItem>
          }
            {(document.cookie === '') && 
            <NavItem >
              <div >
                <p onClick={props.openModalLogin} className="login-signup">Login / Signup</p>
              </div>
            </NavItem>}
            { (document.cookie !== '') && 
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
              <img 
              style={{width: "2.5rem", height: "2.5rem"}} 
              src={user.urlimg} alt="userimg"
              className="userAvt" />
              </DropdownToggle>
              <DropdownMenu right>
            <DropdownItem onClick={myInfo}>
                  <p>My information</p>
                </DropdownItem>
                <DropdownItem>
                  <Link to="/myinvoice">My invoice</Link>
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem onClick={logout}>
                  <p>Logout</p>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>}
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default TopMenu;
