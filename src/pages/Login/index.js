import {Button} from "react-bootstrap";
import {Link} from 'react-router-dom';

const Login=()=>{
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
             />
             </div>

             <div className="inputfield">
             <label>Password</label>
             <input
             className="forminput"
             type="password"
             placeholder="Enter yor password" 
             />
             </div>
            <br/>
             <Button className="signupbtn" variant="primary" size="sm">Login</Button>
         </form>
         <br/>
         <p>Not registered yet? <Link to="/Signup"> Create an Account</Link> </p>
        </div>
        </>
    );
}

export default Login;