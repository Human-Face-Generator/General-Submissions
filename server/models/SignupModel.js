import mongoose from "mongoose";


const SignupSchema=new mongoose.Schema({
    username:{type:String,unique:true,lowercase:true},
    email:{type:String,unique:true,lowercase:true},
    password:{type:String,unique:true},
    status:{type:String,default:"pending"}
});

const SignupModel=mongoose.model("NewUserInfo",SignupSchema);

export default SignupModel;
