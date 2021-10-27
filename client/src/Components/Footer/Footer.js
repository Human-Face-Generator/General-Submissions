import classes from "./Footer.module.css" ;
import FooterLinks from "./FooterLinks";
import SocialMediaIcons from "./SocialMediaIcons";

const Footer = ()=> {
    return (
        <div className={classes.footer}>

            <FooterLinks/>
            <SocialMediaIcons/>
            
            <a className={classes['footer-link']} href="">Terms and Conditions</a> 
            <a className={classes['footer-link']} href="">Privacy Policy</a> 
            
            <hr className={classes.line}/>
            <div className={classes['copyright-message-div']}>
               <p>© 2021 Human-Face-Generator</p>
            </div>
        </div>
    ) ;
} ;

export default Footer ;