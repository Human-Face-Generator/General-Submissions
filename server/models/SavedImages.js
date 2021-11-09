import mongoose from  "mongoose";
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

const SavedImagesModel=mongoose.model("ImageLists",userListsSchema);
export default SavedImagesModel;
