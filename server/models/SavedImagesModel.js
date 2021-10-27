const mongoose = require("mongoose");
// 3 level doc :)

const Imagedoc={
   img_url:String,
   img_name:String

};

const imgListdoc={
   listName:String,
   list:[Imagedoc]
};

const userListsSchema=new mongoose.Schema({
   lists:[imgListdoc]
});

const UserImagesModel=mongoose.model("ImageLists",userListsSchema);
module.exports=UserImagesModel;
