
let errors={}

const checkUsername=(username)=>{

    if (username==="")
    {
       errors.username="Please enter username";
    }
    else if(username.length<5)
    {
        errors.username="Username should consist of atleast 5 characters";
    }
    
}

const checkEmail=(email)=>{
    
   if(!email)
   {errors.email="Please enter your email-id"}
   else if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)))
  {
    errors.email="Please enter valid email-id";
  }
}

const checkPassword=({password,vpassword})=>{
    if(!password)
    {
        errors.password="Please enter a password";
    }
    else if(password.length<6){
        errors.password="Password should be atleast 6 characters long";
    }
    else if(password !== vpassword){
        errors.vpassword="Passwords do not match";
    }
}

const checkFormInputs=({username,email,password,vpassword})=>{
    errors={};
    console.log("checking...")
    checkUsername(username);
    checkEmail(email);
    checkPassword({password,vpassword});
    return errors;
}
export default checkFormInputs;