import React from "react";
import { Nav,Navbar} from "react-bootstrap";
import {Link} from 'react-router-dom';
import './menu.css';
import classes from './Menu.module.css' ;

const Menu=()=>{

    return (
        <>
        <Navbar className={classes.bg}  expand="lg">

          <Nav.Link as={Link}  className={classes.home} to="/"> HOME </Nav.Link>
          <Navbar.Toggle className={classes['toggle-icon']} aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
             <Nav.Link className={classes.link} as={Link} to="/Uses">
              Use Cases
             </Nav.Link>
             <Nav.Link className={classes.link} as={Link} to="/account-images">
              Saved Images
             </Nav.Link>
             <Nav.Link className={classes.link} as={Link} to="/login">
              Login
             </Nav.Link>
            </Nav>
          </Navbar.Collapse>

       </Navbar>
      
        </>

    );

}

export default Menu;