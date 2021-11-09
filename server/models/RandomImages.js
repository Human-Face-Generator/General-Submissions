import mongoose from  "mongoose";

const RandomImgSchema=new mongoose.Schema({
    imgURL:{type:String}
})

const RandomImgModel=mongoose.model("RandomImages",RandomImgSchema);
export default RandomImgModel;