import React from "react";
import {Button} from "react-bootstrap";
import './signup.css';
const SignupForm=()=>{
   return (
       <>
       <div className="formContainer" >
       
        <p>
            Create an account to get started
        </p>
        <form className="form-elements"> 

            <div className="inputfield">
                <label>Username</label>
                <input
                className="forminput"
                 type="text"
                 name="username" 
                 placeholder="Enter your username"    
                />
            </div>

            <div className="inputfield">
                <label>Email</label>
                <input
                 className="forminput"
                 type="email"
                 name="email" 
                 placeholder="Enter your email-id"    
                />
            </div>

            <div className="inputfield">
                <label>Password</label>
                <input
                 className="forminput"
                 type="password"
                 name="password" 
                 placeholder="Enter your password"    
                />
            </div>

            <div className="inputfield">
                <label>Confirm Password</label>
                <input
                 className="forminput"
                 type="password"
                 name="password" 
                 placeholder="Confirm your password"    
                />
            </div>
       <br/>
    <Button className="signupbtn" variant="primary" size="sm"  >Signup</Button>
        </form>
       </div>
       </>
   );

}

export default SignupForm;