import {Button} from "react-bootstrap";
import {Link} from 'react-router-dom';
import {useState} from 'react';

const Login=()=>{

    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");

    return (
        <>
        <div className="formContainer" >
         <h2>Login</h2>
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

             <Button className="signupbtn" variant="primary" size="sm">
                 Login
             </Button>

         </form>

         <br/>
         <p>Not registered yet? <Link to="/Signup"> Create an Account</Link> </p>
        </div>

        </>
    );
}

export default Login;