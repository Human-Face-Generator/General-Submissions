const express= require("express");
const app=express();
const cors=require('cors');
const mongoose=require("mongoose");
const SignupModel = require("./models/SignupModel");

mongoose.connect("mongodb+srv://Stark:stark123@hfg.prgke.mongodb.net/HFG?retryWrites=true&w=majority",
 { useNewUrlParser: true },{ useUnifiedTopology: true }, );

app.use(express.json());
app.use(cors());



// adding New User info to database
app.post("/signupInfo",async(req,res)=>{

    console.log("in post");
    const username=req.body.username;
    const email=req.body.email;
    const password=req.body.password;
 
    const newUser=new SignupModel({
        username: username,
        email: email,
        password: password
    });

    try{
          await newUser.save();
          console.log("New User added");
    }
    catch(err)
    {
        console.log(err);
    }

});



// Checking login info 
app.post("/LoginInfo",async (req,res)=>{

    const email=req.body.email;
    const password=req.body.password;
    var message=""; 

    await SignupModel.find({email:email,password:password},(err,result)=>{
          console.log("**********************");
       
        if(err)
        {
            message="An error occured";
        }
        else if(result.length === 0)
        {  
            message="Either email or password is not correct";
        }
        else if( result.length === 1)
        {
            message="Valid User";
          
        }      
        console.log(message);    
      res.send(message);

    }).clone().catch((err)=>{console.log(err)});
     // use catch to avoid promise errors/warning

});


// getting saved images
app.get("/ImageLists",(req,res)=>{
  
    
    
})

app.listen(3004,()=>{
    console.log("Server running at 3004");
})