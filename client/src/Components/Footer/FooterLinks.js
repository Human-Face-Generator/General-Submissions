import classes from './FooterLinks.module.css' ;
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

const FooterLinks = () => {
    return (
        <div>
            <Router>
            <Container fluid="xs">
              
               <Row>
                   <Col lg={3}>
                      <div className={classes["upon-hover"]}>
                        <Link className={classes['footer-link']} to="/about">About Us</Link>
                      </div>
                   </Col>
                   <Col lg={3}>
                      <div className={classes["upon-hover"]}>
                       <Link className={classes['footer-link']} to="/contact">Contact Us</Link> 
                      </div>
                   </Col>
                   <Col lg={3}>
                      <div className={classes["upon-hover"]}> 
                       <Link className={classes['footer-link']} to="/FAQ">FAQ</Link>
                      </div>
                   </Col>
                   <Col lg={3}>
                       <div className={classes["upon-hover"]}>
                        <Link className={classes['footer-link']} to="/explore-iamges">
                          Explore Images
                        </Link>
                       </div>
                   </Col>
               </Row>

               {/* <Switch>
                   <Route path="/about"></Route>
                   <Route path="/contact"></Route>
                   <Route path="/FAQ"></Route>
                   <Route path="/explore-images"></Route>
               </Switch> */}

            </Container>
            </Router>
        </div>

    ) ;
} ;

export default FooterLinks;