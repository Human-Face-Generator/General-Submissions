import mongoose from "mongoose";

const SignupSchema=new mongoose.Schema({
    username:{type:String,unique:true,lowercase:true},
    email:{type:String,unique:true,lowercase:true},
    password:String,
    status:{type:String,default:"pending"},
    google_id:String,
    facebook_id:String,
    twitter_id:String
});

const SignupModel=mongoose.model("NewUserInfo",SignupSchema);
export default SignupModel;
