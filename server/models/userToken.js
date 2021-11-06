import mongoose from  "mongoose";

const tokenSchema=new mongoose.Schema({
    user_id:{type:mongoose.Schema.Types.ObjectId,required:true},
    token:{type:String,required:true},
    
})

const tokenModel=mongoose.model("Token",tokenSchema);
export default tokenModel;