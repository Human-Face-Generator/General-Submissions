import classes from "./Layout.module.css" ;

const Contact = ()=> {
    return (
        <div>
          <h2>Contact Us</h2>
          <h5>The opinions of our users matter!</h5>
          <div className={classes['detail-items']}>
            <ul>
              <li>
                Have you found a bug?
              </li>
              <li>
                Do you have suggestions?
              </li>
              <li>
                Would like to give us a feedback?
              </li>
              <hr/>
              <li>
                <a href="mailto:xyz@gmail.com" className={classes.mail}>
                 feedback@facegenerator.com
                </a> 
              </li>
            </ul>
            
          </div>
        </div>
    ) ;
} ;


export default Contact;