import React from "react";
import { Nav,Navbar} from "react-bootstrap";
import {Link} from 'react-router-dom';
import './menu.css';
const Menu=()=>{

    return (
        <>
        <Navbar bg="light" expand="lg">
        <Nav.Link as={Link}  className="HomeNav" to="/"> Home</Nav.Link>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="me-auto">
        <Nav.Link as={Link} to="/Uses">Use Cases</Nav.Link>
        <Nav.Link as={Link} to="/account-images">Saved Images</Nav.Link>
      </Nav>
    </Navbar.Collapse>

       </Navbar>
        </>

    );

}

export default Menu;