import passport from "passport";
import {OAuth2Strategy as GoogleStrategy} from "passport-google-oauth";
import SignupModel from "./models/Signup.js";

passport.serializeUser(function(user, done) { // user to id so that info can be retrieved later 
  done(null, user.id);
});

passport.deserializeUser(function(id, done) { // user id to user info
    done(null, id);
});

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL:"http://localhost:3004/auth/google/callback"
},
  async (accessToken, refreshToken, profile, done)=> {
      // will be called after authentication
      try{

    //console.log(profile._json);
      var user= await SignupModel.findOne({email: profile._json.email});  
     if(user)
      {   
        user.status="active";
        
        user.google_id=profile.id;
        await user.save();
      }
      else
     {const newUser=await new SignupModel({
        username: profile._json.name,
        email: profile._json.email,
        status:'active',
        google_id:profile.id
    }).save();
  }

    return done(null,profile);
}
  catch(err)     
  {
    return done(err)
  }
}));