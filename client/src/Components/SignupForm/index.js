import React, { useEffect, useState } from "react";
import {Button} from "react-bootstrap";
import './signup.css';
import checkFormInputs from "./formValidation";
import { Redirect } from "react-router";
import Axios from "axios";


const SignupForm=()=>{

    const [username,setUsername]=useState("");
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [vpassword,setVpassword]=useState("");
    const [errors,setErrors]=useState({});
    const [shouldsubmit,setSubmit]=useState(false);


    const checkfields=()=>{
        
            
        var x=checkFormInputs({username,email,password,vpassword});

        setErrors(x);   

        if (JSON.stringify(x) === '{}')
        {  
            Axios.post("http://localhost:3004/signupInfo",{username:username,
            email:email,password:password});
            console.log("valid signup entry");
            
           setSubmit(true);           
        } 
        else
        {console.log(errors);}
     

    }

    
   return (
       <>
       <div className="formContainer" >
       
        <p>
            Create an account to get started
        </p>
        <form className="form-elements" > 

            <div className="inputfield">
                <label>Username</label>
                <input
                className="forminput"
                 type="text"
                 name="username" 
                 placeholder="Enter your username" 
                 maxLength="20"
                 value={username}  
                 onChange={(e)=>{setUsername(e.target.value) }} 
                 
                />
                {errors.username && <p> {errors.username} </p>}
            </div>

            <div className="inputfield">
                <label>Email</label>
                <input
                 className="forminput"
                 type="email"
                 name="email" 
                 placeholder="Enter your email-id" 
                 value={email} 
                 onChange={(e)=>{setEmail(e.target.value)}}  
                />
                {errors.email && <p>{errors.email}</p>}
            </div>

            <div className="inputfield">
                <label>Password</label>
                <input
                 className="forminput"
                 type="password"
                 name="password" 
                 placeholder="Enter your password" 
                 value={password}   
                 onChange={(e)=>{setPassword(e.target.value)}}
                />
                {errors.password && <p>{errors.password}</p>}
            </div>

            <div className="inputfield">
                <label>Confirm Password</label>
                <input
                 className="forminput"
                 type="password"
                 name="password" 
                 placeholder="Confirm your password"  
                 value={vpassword}  
                 onChange={(e)=>{setVpassword(e.target.value)}}
                />
                {errors.vpassword && <p>{errors.vpassword}</p>}
            </div>
       <br/>

        <Button className="signupbtn" variant="primary" size="sm"
        onClick={checkfields} >
        Signup
        </Button>
       
         {shouldsubmit && <Redirect to="/"/>}
        </form>
       </div>
       </>
   );

}

export default SignupForm;