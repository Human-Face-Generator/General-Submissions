import classes from "./Footer.module.css" ;
import FooterLinks from "./FooterLinks";
import SocialMediaIcons from "./SocialMediaIcons";

const Footer = ()=> {
    return (
        <div className={classes.footer}>

            <FooterLinks/>
            <hr className={classes.lineone}/>
            <SocialMediaIcons/>

            <div>
              <a className={classes['footer-link2']} href="">Terms and Conditions</a> 
              <p className={classes.ptag}>|</p>
              <a className={classes['footer-link2']} href="">Privacy Policy</a> 
            </div>
            
            <hr className={classes.linetwo}/>
            <div className={classes['copyright-message-div']}>
               <p>© 2021 Human-Face-Generator</p>
            </div>
        </div>
    ) ;
} ;

export default Footer ;