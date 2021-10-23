const mongoose=require("mongoose");

const SignupSchema=new mongoose.Schema({
    username:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String
    }
});

const SignupModel=mongoose.model("NewUserInfo",SignupSchema);

module.exports=SignupModel;
