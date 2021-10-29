import express from "express";
import cors from "cors";
import  "./Connection/mongodb.js";
import upload from "./Connection/multer_GridFS.js";
import SignupModel from "./models/SignupModel.js";
import SavedImagesModel from "./models/SavedImagesModel.js";

const app=express();
app.use(express.json());
app.use(cors());


app.post("/upload",upload.single("sampleimg"),(req,res)=>{
    res.send("image uploaded");
});

const uid="6173897315e1bbccd6a0c4f0";

// adding New User info to database
app.post("/signupInfo",async (req,res)=>{

    console.log("in post");
    const username=req.body.username;
    const email=req.body.email;
    const password=req.body.password;
 
    const newUser=new SignupModel({
        username: username,
        email: email,
        password: password
    });

   await newUser.save().
   then((res)=>console.log(res)).
   catch((err)=>{console.log(err)});
   
});



// Checking login info 
app.post("/LoginInfo", async (req,res)=>{

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
});


// getting saved images
app.get("/ImageLists", async (req,res)=>{

    
   /* const imgdoc={
        img_url:"https://static.generated.photos/vue-static/face-generator/landing/wall/20.jpg",
        img_name:"random pic",
    

    };

    const imgdoc2={
        img_url:"https://cdn.pixabay.com/photo/2021/06/04/10/28/portrait-6309448_960_720.jpg",
        img_name:"another random pic"
    }
    const imgList={
        listName:"DefaultList",
         list:[imgdoc,imgdoc2]
    };
   console.log(imgList);
    const new_doc=new SavedImagesModel({_id:uid,
     lists:[imgList]
    });

     new_doc.save((err,res)=>{
        if(err)
        {console.log(err);}
        else
        {
            console.log("added");
        }    
    });
*/
  await SavedImagesModel.findOne({_id:uid}).then(
       (doc)=>{
        console.log(doc);
        res.send(doc);
       }
   ).catch(err=>console.log(err));
 
    
});


// adding new collection

app.post("/addnewcollection",async (req,res)=>{
     const collName=req.body.collName;
     console.log(req.body)
     const newColl={
         listName:collName,
         list:[]
     };
     console.log(collName)
     
     await SavedImagesModel.findByIdAndUpdate(uid,{$push:{lists:newColl}}).then(
         (result)=>{
             res.send("ok");
         }
     ).catch((err)=>{console.log(err)})
        
       
  
    // {$pull:{lists:{listName:""}}} to remove
});


// delete collection
app.post("/deleteCollection",async (req,res)=>{
    const coll=req.body.collection;
    await SavedImagesModel.findByIdAndUpdate(uid,{$pull:{lists:{listName:coll}}}).
    then( result=>res.send("ok")
    ).catch((err)=>console.log(err));
    
});

app.listen(3004,()=>{
    console.log("Server running at 3004");
})