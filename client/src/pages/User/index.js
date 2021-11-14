import { useEffect } from 'react';
import {useParams} from 'react-router-dom';
import {useHistory,Link} from 'react-router-dom';

const User=()=>{
      
    localStorage.setItem("UserID",useParams().uid);
    console.log(useParams().uid);
    let history=useHistory();

    useEffect(()=>{     
        const loggedInEvent = new CustomEvent("logged-in", {});
         window.dispatchEvent(loggedInEvent);
        setTimeout(()=>{
            history.push("/");
        },7000);
    },[])


return( 
    <>
    <h3>You have been successfully verified your account !!<br/>You will be redirected to home page shortly.</h3>
    <span>if not redirected click </span>
    <Link to='/'>here</Link>
   </>);
};

export default User;