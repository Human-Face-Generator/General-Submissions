import { Button } from "react-bootstrap";
import { Link, Redirect, useLocation, useHistory } from 'react-router-dom';
import { useState } from 'react';
import Axios from "axios";
import './index.css';
import LoginIcon from './images/LoginIcon.png';
import google_icon from "./images/google_icon.png";
import facebook_icon from "./images/facebook_icon.png";
import twitter_icon from "./images/twitter_icon.png";


const Login = () => {
   
    const [email, setEmail] = useState("");
    let location = useLocation();
   
    const [password, setPassword] = useState("");
    const [validUser, setValidity] = useState(false);
    const [errors, setErrors] = useState("");
    let history = useHistory();

    const checkUser =async () => {
       await Axios.post("http://localhost:3004/LoginInfo", { email, password }).then((res) => {

            if (res.data.message === "Valid User") {
                localStorage.setItem("UserID", res.data.uid);
                const loggedInEvent = new CustomEvent("logged-in", {});
                window.dispatchEvent(loggedInEvent);
                setValidity(true);
            }
            else {
                setErrors(res.data.message);
            }

        }).catch((err) => { console.log(err) });
    }
    
    const googleSignUp=async ()=>{
        //await Axios.get('http://localhost:3004/auth/google'); // cors error
        window.open('http://localhost:3004/auth/google', "_self");   
    }

    const fbSignUp=async ()=>{    
        window.open('http://localhost:3004/auth/fb', "_self");   
    }

    const twitterSignUp=async ()=>{    
        window.open('http://localhost:3004/auth/twitter', "_self");   
    }
    
    return (
        <>  <div className="LoginPage">
            <div className="LoginformContainer" >
                <div className="loginHeader">
                <p className="loginHeading" >Login</p>
                <img 
                className="LoginIcon"
                src={LoginIcon}/>
                </div>
                <br />
                <form className="form-elements">

                    <div className="inputfield">
                        <label>Email</label>
                        <input
                            className="forminput"
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => { setEmail(e.target.value) }}
                        />
                    </div>

                    <div className="inputfield">
                        <label>Password</label>
                        <input
                            className="forminput"
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => { setPassword(e.target.value) }}
                        />
                    </div>
                    <br />

                    <Button className="signupbtn" variant="primary" size="sm"
                        onClick={async()=>await checkUser()} >
                        Login
                    </Button>

                </form>

                <br />
                {errors && <p className="signupErrors">{errors}<br /></p>}
                {validUser && <Redirect to="/" ></Redirect>}
                <div className="loginFooter">
                   <p> Not registered yet? </p>
                    <Link to="/Signup"> Create an Account</Link> 
                </div>
                <div className="loginFooter2">
                    <p>Or Sign Up using</p>
                    <div className="login-icons">
                    <span><img src={google_icon} 
                    className="signup_icon"
                         onClick={async()=> await googleSignUp()}/>
                    </span>
                    <span><img src={facebook_icon} 
                    className="signup_icon"
                         onClick={async()=> await fbSignUp()}/>
                    </span>
                    <span><img src={twitter_icon} 
                    className="signup_icon"
                         onClick={async()=> await twitterSignUp()}/>
                    </span>
                    </div>
                </div>
            </div>
            
           
</div>
        </>
    );
}

export default Login;