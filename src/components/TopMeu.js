import React, { useState } from "react";
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
import cart from "../img/cart.svg";
import avt from "../img/avt.jpg";

const TopMenu = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const userAvt = props.userAvt || avt;
  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
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
                  <img src={cart} alt="cartIcon" width="30px" height="30px" />
                </Link>
                   <span className="numberItems">{0}</span>
              </div>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                <img
                  className="userAvt"
                  src={userAvt}
                  alt="avtuser"
                  width="30px"
                  height="30px"
                />
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>
                  <Link className="link-dropdown" to="login">
                    Login
                  </Link>
                </DropdownItem>
                <DropdownItem>
                  <Link className="link-dropdown" to="/sigin">
                    Sigin
                  </Link>
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem>
                  <Link className="link-dropdown" to="/sigin">
                    Logout
                  </Link>
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
