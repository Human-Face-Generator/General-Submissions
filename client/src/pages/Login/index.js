import { Button } from "react-bootstrap";
import { Link, Redirect, useLocation, useHistory } from 'react-router-dom';
import { useState } from 'react';
import Axios from "axios";
import './index.css';
const Login = () => {
   
    const [email, setEmail] = useState("");
    let location = useLocation();
   
    const [password, setPassword] = useState("");
    const [validUser, setValidity] = useState(false);
    const [errors, setErrors] = useState("");
    let history = useHistory();
    const checkUser = () => {
        Axios.post("http://localhost:3004/LoginInfo", { email, password }).then((res) => {

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

    return (
        <>
            <div className="formContainer" >
                <h3 >Login</h3><br />
                <form className="form-elements">

                    <div className="inputfield">
                        <label>Email</label>
                        <input
                            className="forminput"
                            type="email"
                            placeholder="Enter yor email"
                            value={email}
                            onChange={(e) => { setEmail(e.target.value) }}
                        />
                    </div>

                    <div className="inputfield">
                        <label>Password</label>
                        <input
                            className="forminput"
                            type="password"
                            placeholder="Enter yor password"
                            value={password}
                            onChange={(e) => { setPassword(e.target.value) }}
                        />
                    </div>
                    <br />

                    <Button className="signupbtn" variant="primary" size="sm"
                        onClick={checkUser} >
                        Login
                    </Button>

                </form>

                <br />
                {errors && <p className="signupErrors">{errors}<br /></p>}
                {validUser && <Redirect to="/" ></Redirect>}
                <p className="loginFooter">Not registered yet? <Link to="/Signup"> Create an Account</Link> </p>
            </div>

        </>
    );
}

export default Login;