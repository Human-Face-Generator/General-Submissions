import {Button} from "react-bootstrap";
import {Link,Redirect} from 'react-router-dom';
import {useState} from 'react';
import Axios from "axios";

const Login=()=>{

    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [validUser,setValidity]=useState(false);
    const [errors,setErrors]=useState("");

    const checkUser=()=>{
        
        Axios.post("http://localhost:3004/LoginInfo",{email,password}).then((res)=>{
            console.log("In checkuser fxn");
            console.log(res.data);

            if(res.data==="Valid User")
            { 
                 setValidity(true);
            }
            else 
            { 
                setErrors(res.data);  
            }
      
        })
    }

    return (
        <>
        <div className="formContainer" >
         <h3>Login</h3><br/>
         <form className="form-elements">

             <div className="inputfield">
             <label>Email</label>
             <input
             className="forminput"
             type="email"
             placeholder="Enter yor email" 
             value={email} 
             onChange={(e)=>{setEmail(e.target.value)}}  
             />
             </div>

             <div className="inputfield">
             <label>Password</label>
             <input
             className="forminput"
             type="password"
             placeholder="Enter yor password" 
             value={password}   
             onChange={(e)=>{setPassword(e.target.value)}}
             />
             </div>
            <br/>

             <Button className="signupbtn" variant="primary" size="sm" 
             onClick={checkUser} >
                 Login
             </Button>

         </form>

         <br/>
         {errors && <p>{errors}<br/></p> }
         {validUser && <Redirect to="/"></Redirect>   }
         <p>Not registered yet? <Link to="/Signup"> Create an Account</Link> </p>
        </div>

        </>
    );
}

export default Login;