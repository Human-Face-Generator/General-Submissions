import React, { useEffect,useState } from "react";
import { Nav,Navbar} from "react-bootstrap";
import {Link} from 'react-router-dom';
import './menu.css';
import classes from './Menu.module.css' ;

const Menu=(props)=>{
     
   const [user,setCurrUser]=useState(localStorage.getItem("UserID"));
    //console.log(!localStorage.getItem('UserID'))
 
    const logoutUser= ()=>{
     localStorage.removeItem('UserID');
     setCurrUser(null);
    }
    
    const fxn=()=>{
      console.log("in login")
    }
     useEffect(()=>setCurrUser(localStorage.getItem('UserID')),
     props.uid);

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
            {!user?<Nav.Link className={classes.link} as={Link} to={{pathname:"/login",state:{setCurrUser}}} >
              Login
             </Nav.Link>:
             <Nav.Link className={classes.link} onClick={()=>logoutUser()} as={Link} to="/">
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