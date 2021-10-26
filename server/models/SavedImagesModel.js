const mongoose=require("mongoose");

const ImagesSchema=new mongoose.Schema({

   DefaultList:Array,
   List1:Array
});

const UserImagesModel=mongoose.model("ImageLists",ImagesSchema);
module.exports=UserImagesModel;
