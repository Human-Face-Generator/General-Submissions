import express from "express";
import cors from "cors";
import  "./Connection/mongodb.js";
import {upload,gfs,gridFSBucket} from "./Connection/multer_GridFS.js";
import SignupModel from "./models/SignupModel.js";
import SavedImagesModel from "./models/SavedImagesModel.js";

const app=express();
app.use(express.json());
app.use(cors());

const uid="6173897315e1bbccd6a0c4f0";

const addNewUser=async ({req,res})=>{
    
    const username=req.body.username;
    const email=req.body.email;
    const password=req.body.password;
 
    const newUser=new SignupModel({
        username: username,
        email: email,
        password: password
    });

   await newUser.save().
   then((doc)=>res.send(doc)).
   catch((err)=>{console.log(err)});
}

const checkLoginData=async ({req,res})=>{
    const email=req.body.email;
    const password=req.body.password;
    var message=""; 

    await SignupModel.find({email:email,password:password}).then(
        (result)=>{
            if(result.length === 0)
            {  
                message="Either email or password is not correct";
            }
        else if( result.length >= 1)
            {
                message="Valid User";             
            }      
        }
    ).catch((err)=>{
        message="An error occured";
    })       
    
    console.log(message);       
      res.send(message);// error could be here
}

const addCollection=async({req,res})=>{
    const collName=req.body.collName;
    console.log(req.body)
    const newColl={
        listName:collName,
        list:[]
    };
  
   await SavedImagesModel.countDocuments({_id:uid}).
   then(async (count)=>{
       if(count === 0)
       {
          // new document     
           const new_doc=new SavedImagesModel({_id:uid,
            lists:[newColl]
           });
       
            await new_doc.save().
            then(result=>res.send("new doc added")).
            catch(err=>console.log(err))
   
       }
       else
       {
         
   //if user doc already exists
    await SavedImagesModel.findByIdAndUpdate(uid,{$push:{lists:newColl}}).
    then((result)=>{
     res.send("doc updated");}).
       catch((err)=>{console.log(err)});

       }
   }).
   catch(err=>console.log(err))
  
}

const deleteCollection=async ({req,res})=>{
    const coll=req.body.collection;
    await SavedImagesModel.findByIdAndUpdate(uid,{$pull:{lists:{listName:coll}}}).
    then( result=>res.send("ok")
    ).catch((err)=>console.log(err));
    
}

const getImages=async ({req,res})=>{
    await SavedImagesModel.findOne({_id:uid}).then(
        (doc)=>{ 
            if(doc)     
         {console.log(doc);
        res.send(doc);}
        else
        {
            res.send("Empty List");
        }
        }
    ).catch(err=>console.log(err));
}

const uploadTodb=async ({req,res})=>{
    const filename=(req.file.filename)
    const new_img={img_name:"Imagexyz",img_url:filename};
    const query= {$push:{'lists.$.list':new_img}};

    await SavedImagesModel.updateOne({_id:uid,'lists.listName':'DefaultList'},
       query).then(
        (result)=>{
            res.send("ok");
        }
    ).catch((err)=>{console.log(err)})
}

const showImage=async ({res,imgurl})=>{
    console.log(imgurl);
  
       await gfs.files.findOne({filename:imgurl}).
        then((file)=>{
            if(!file || file.length === 0)
            {
                res.send("one of the image not present");
            }
            else
            {  console.log(file);
                const readStream = gridFSBucket.openDownloadStream(file._id);
                readStream.pipe(res);              
            }
            }
        ).catch((err)=>{console.log(err)})
}





// adding New User info to database
app.post("/signupInfo",async (req,res)=>{
    await addNewUser({req,res});
    
 });

// Checking login info 
app.post("/LoginInfo", async (req,res)=>{
    await checkLoginData({req,res});
});

// adding new collection
app.post("/addnewcollection",async (req,res)=>{
    await addCollection({req,res});       
});

// delete collection
app.post("/deleteCollection",async (req,res)=>{
      await deleteCollection({req,res});
});

// getting saved images
app.get("/ImageLists", async (req,res)=>{
    await getImages({req,res});  
  }); 

// uploading user images to default list as of now
app.post("/upload",upload.single("sampleimg"),async (req,res)=>{
   await uploadTodb({req,res});
});

//display requested image
app.get("/obtain-images/:filename",async (req,res)=>{
    const imgurl=req.params.filename;
    await showImage({res,imgurl});  
})


app.listen(3004,()=>{
    console.log("Server running at 3004");
})