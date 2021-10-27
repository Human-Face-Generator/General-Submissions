import classes from './FooterLinks.module.css' ;
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const FooterLinks = () => {
    return (

        <div>
            <Container fluid="xs">
               <Row>
                   <Col lg={3}>
                      <a className={classes['footer-link']} href="">About Us</a>
                   </Col>
                   <Col lg={3}>
                      <a className={classes['footer-link']} href="">Contact Us</a> 
                   </Col>
                   <Col lg={3}>
                      <a className={classes['footer-link']} href="">FAQ</a> 
                   </Col>
                   <Col lg={3}>
                       <a className={classes['footer-link']} href="">Explore Images</a>
                   </Col>
               </Row>
            </Container>
        </div>

        // <div className={classes['footer-links']}>
        //     <span> 
        //         <a className={classes['footer-link']} href="">About Us</a> 
        //     </span>
        //     <span> 
        //         <a className={classes['footer-link']} href="">Contact Us</a> 
        //     </span>
        //     <span> 
        //         <a className={classes['footer-link']} href="">FAQ</a> 
        //     </span>
        //     <span>
        //         <a className={classes['footer-link']} href="">Terms and Conditions</a> 
        //     </span>
        //     <span>
        //         <a className={classes['footer-link']} href="">Privacy Policy</a> 
        //     </span> 
        // </div>
    ) ;
} ;

export default FooterLinks;