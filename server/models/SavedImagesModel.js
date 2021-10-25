const mongoose=require("mongoose");

const ImagesSchema=new mongoose.Schema({

   DefaultList:Array
});

const ImagesModel=mongoose.model("ImageLists",ImagesSchema);
module.exports=ImagesModel;
