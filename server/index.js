const express= require("express");
const app=express();
const cors=require('cors');
const mongoose=require("mongoose");
const SignupModel = require("./models/SignupModel");

mongoose.connect("mongodb+srv://Stark:stark123@hfg.prgke.mongodb.net/HFG?retryWrites=true&w=majority",
 { useNewUrlParser: true },{ useUnifiedTopology: true }, );

app.use(express.json());
app.use(cors());

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

})

app.listen(3004,()=>{
    console.log("Server running at 3004");
})