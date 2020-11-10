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
import ModalLogin from './ModalLogin';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';


const TopMenu = (props) => {
  const { user } = useContext(UserContext);
  let avt;
  if(user) {
    avt = <img style={{width: "2.5rem", height: "2.5rem"}} src={user.urlimg} alt="userimg" />;
  }else{
    avt = <FontAwesomeIcon icon={faUser} size="2x" /> ;
  }
  const [isOpen, setIsOpen] = useState(false);
  const [login, setLogin] = useState(false);
  const { userCart } = useContext(CartContext);
  const toggle = () => setIsOpen(!isOpen);
  let count = 0;
  for(let i = 0; i < userCart.length; i++){
    count += userCart[i].count;
  };
  const openModalLogin = () => setLogin(!login);
  return (
    
    <div>
      {login&&<ModalLogin openModalLogin={openModalLogin} />}
      <Navbar fixed="top" color="light" light expand="md">
        <NavbarBrand href="/">
          <div className="logo">BookShop</div>
        </NavbarBrand>

        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <div className="cart">
                <Link className="link" to="/cart">
                  <FontAwesomeIcon icon={faCartPlus} size="2x" />
                </Link>
                  <span className="numberItems">{count}</span>
              </div>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                {avt}
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem onClick={openModalLogin}>
                  <p>Login/Sigin</p>
                </DropdownItem>
                <DropdownItem>
                  <p>My invoice</p>
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem>
                  <p>Logout</p>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default TopMenu;
