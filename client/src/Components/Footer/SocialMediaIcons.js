import classes from "./SocialMediaIcons.module.css" ;
import fb from './icons/fb.png' ;
import linkdn from './icons/linkdn.png' ;
import twi from './icons/twi.png' ;

const SocialMediaIcons = () => {
    return (
        <div>
            <a className={classes.link} href=""> 
              <img className={classes.icon} src={fb}></img> 
            </a>
            <a className={classes.link} href=""> 
              <img className={classes.icon} src={linkdn}></img> 
            </a>
            <a className={classes.link} href=""> 
              <img className={classes.icon} src={twi}></img> 
            </a>
        </div>
    ) ;
} ;

export default SocialMediaIcons;