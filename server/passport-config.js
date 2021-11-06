import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcrypt";


const initialize=(passport)=>{
    
    const authenticateUser=(email,password,done)=>{

    // will call done fxn when we are done authenticatng the user 
    // done(err if any, user found or not, message) and here error means sys err like ,user not found is not a error
    const user=getUserByEmail(email);
    if(user === null)
    {
        return done(null,false,{message:"No user with that email-id"})
    }

    try{
        if( await bcrypt.compare(password,user.password))
        {
          return done(null,user);
        }
        else
        {
          return done(null,false,{message:"Incorrect password"})
        }
    } catch(err){
        return done(err);
    }

    }

    passport.use(new LocalStrategy({username:'email'}),
        authenticateUser);
    
    passport.serializeUser((user,done)=>{})// serialize user to store inside the session  
    passport.deserializeUser((id,done)=>{})
    
}

export default initialize;