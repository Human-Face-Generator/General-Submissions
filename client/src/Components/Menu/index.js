import React, { useEffect, useState } from "react";
import { Nav, Navbar } from "react-bootstrap";
import { Link, useHistory } from 'react-router-dom';
import './menu.css';
import classes from './Menu.module.css';

const Menu = () => {

  //const [user, setCurrUser] = useState(localStorage.getItem("UserID"));
  var [isLoggedIn, setLoggedIn] =useState(localStorage.getItem("UserID"));
  let history = useHistory();


  const loggedInEventHandler = () => {
    //setCurrUser(localStorage.getItem("UserID"));
    setLoggedIn(localStorage.getItem("UserID"));
  }
  const loggedOutEventHandler = () => {
    setLoggedIn(null);
  }

  const logoutUser = () => {
    localStorage.removeItem('UserID');
    //setCurrUser(null); 
    const loggedOutEvent = new CustomEvent("logged-out", {});
    window.dispatchEvent(loggedOutEvent);
  }

  useEffect(() => {
    window.addEventListener("logged-in", loggedInEventHandler);
    window.addEventListener("logged-out", loggedOutEventHandler);
    return () => {
      window.removeEventListener("logged-in", loggedInEventHandler);
      window.removeEventListener("logged-out", loggedOutEventHandler);
    }
  });


  return (
    <>
      <Navbar className={classes.bg} expand="lg">

        <Nav.Link as={Link} className={classes.home} to="/"> HOME </Nav.Link>
        <Navbar.Toggle className={classes['navbar-toggler']} aria-controls="basic-navbar-nav" />
        <Navbar.Collapse  id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link className={classes.link} as={Link} to="/Uses">
              Use Cases
            </Nav.Link>
            <Nav.Link className={classes.link} as={Link} to="/generateMask">
              Generate a face from mask
            </Nav.Link>
            <Nav.Link className={classes.link} as={Link} to="/explore-images">
              Browse All Images
            </Nav.Link>
            <Nav.Link className={classes.link} as={Link} to="/account-images">
              Saved Images
            </Nav.Link>
            {!isLoggedIn ? <Nav.Link className={classes.link} onClick={() => { history.push({ pathname: "/login" }) }}  >
              Login
            </Nav.Link> :
              <Nav.Link className={classes.link} onClick={() => logoutUser()} as={Link} to="/">
                Logout
              </Nav.Link>
            }
          </Nav>
        </Navbar.Collapse>

      </Navbar>

    </>

  );

}

export default Menu;