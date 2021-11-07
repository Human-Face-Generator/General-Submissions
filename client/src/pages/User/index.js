import {useParams} from 'react-router-dom';
import {useHistory,Link} from 'react-router-dom';
const User=(props)=>{
    
    
    localStorage.setItem("UserID",useParams().uid);
    console.log(useParams().uid);
    let history=useHistory();
    setTimeout(()=>{
        history.push("/");
    },7000);

    
return(
  
    <>
    <h1>You have been successfully signed up!!</h1>
    <span>if not redirected click </span>
    <Link to='/'>here</Link>
    </>
)
};
export default User;