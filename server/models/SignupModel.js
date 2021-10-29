import mongoose from "mongoose";


const SignupSchema=new mongoose.Schema({
    username:String,
    email:String,
    password:String
});

const SignupModel=mongoose.model("NewUserInfo",SignupSchema);

export default SignupModel;
