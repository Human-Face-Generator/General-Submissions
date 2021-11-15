import passport from "passport";
import {OAuth2Strategy as GoogleStrategy} from "passport-google-oauth";
import {Strategy as FacebookStrategy} from 'passport-facebook';
import {Strategy as TwitterStrategy} from 'passport-twitter';
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



passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: "http://localhost:3004/auth/fb/callback",
    profileFields: ['id', 'emails', 'name'] 
  },
  async (accessToken, refreshToken, profile, done)=> {
       
    try{

      //console.log(profile);
        var user= await SignupModel.findOne({email: profile._json.email});  
       if(user)
        {   
          user.status="active";         
          user.facebook_id=profile.id;
          await user.save();
        }
        else
       {const newUser=await new SignupModel({
          username: profile._json.first_name+profile._json.last_name,
          email: profile._json.email,
          status:'active',
          facebook_id:profile.id
      }).save();
    }
  
      return done(null,profile);
  }
    catch(err)     
    { console.log(err)
      return done(err)
    }
  }));


  passport.use(new TwitterStrategy({
    consumerKey: process.env.TWITTER_CONSUMER_KEY,
    consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
    callbackURL: "http://localhost:3004/auth/twitter/callback",
    includeEmail:true
  },
  async (accessToken, refreshToken, profile, done)=> {
       
    try{

      //console.log(profile);
      const email=profile.emails[0].value;
        var user= await SignupModel.findOne({email});  
       if(user)
        {   
          user.status="active";         
          user.twitter_id=profile.id;
          await user.save();
        }
        else
       {const newUser=await new SignupModel({
          username: profile.displayName,
          email:email,
          status:'active',
          twitter_id:profile.id
      }).save();
    }
  
      return done(null,profile);
  }
    catch(err)     
    { console.log(err)
      return done(err)
    }
  }));



