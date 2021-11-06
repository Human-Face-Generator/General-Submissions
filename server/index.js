import express from "express";
import cors from "cors";
import bcrypt from "bcrypt";
import  "./Connection/mongodb.js";
import {upload,gfs,gridFSBucket} from "./Connection/multer_GridFS.js";
import SignupModel from "./models/SignupModel.js";
import SavedImagesModel from "./models/SavedImagesModel.js";
import tokenModel from "./models/userToken.js";
import sendEmail from "./utils/Email.js";
import crypto from "crypto";
// import passport from "passport";
// import flash from "express-flash";
// import session from "express-session";
// import initialize from "./passport-config.js";
// initialize(passport,email=>users.find(user=> email === user.email));

const app=express();
app.use(express.json());
app.use(cors());
// app.use(flash());
// app.use(session({
//     secret:process.env.SESSION_SECRET,
//     resave:false,
//     saveUninitialized: false
// }));
// app.use(passport.initialize());
// app.use(passport.session());
const uid="6173897315e1bbccd6a0c4f0";

const addNewUser=async ({req,res})=>{
    try{       
    const username=req.body.username;
    const email=req.body.email;
    const password=req.body.password;
    var exit=false;
    const user= await SignupModel.findOne({email});  
     if(user)
      {  exit=true;
          res.send("User with this email-id already exists!");        
      }
      if(exit)
      { return ; }

    const hashedPassword= await bcrypt.hash(password,10);
    const newUser=await new SignupModel({
        username: username,
        email: email,
        password: hashedPassword
    }).save();
   // console.log(newUser)
  
 
      const OTtoken=await new tokenModel({
          user_id:newUser._id,
          token:crypto.randomBytes(32).toString("hex")
      }).save();

      const link=`http://localhost:3004/user-verification/${newUser._id}/${OTtoken.token}`;
      const message=`Hello ${newUser.username},Hello and welcome to Human Face Generator.\n
      Please Click ${link} to verify your account `;

    var mailResponse= await sendEmail(email,"Please verify your Email-account",message);
    //console.log(mailResponse)
    if(mailResponse === "email sent successfully")
    {       //console.log("hello")
        res.send(mailResponse);
    }
   
    if(mailResponse === "email sent successfully")
    {       //console.log("hello from here also")
         setTimeout(async ()=>{
              if(newUser.status === 'pending')
              {
                await tokenModel.deleteOne({_id:OTtoken._id});
                await SignupModel.deleteOne({_id:newUser._id});
                res.send("You have ")
              }
         },600000)
    }
    else
    {
        res.send("Something went wrong, please try again");
    }
     
}

      catch(err)
      {
          console.log(err)
      }   
}

const checkLoginData=async ({req,res})=>{
    const email=req.body.email;
    const password=req.body.password;
    var message=""; 

    await SignupModel.find({email:email},{password:1}).then(
        async (result)=>{
            //console.log(result);
            if(result.length === 0)
            {  
                message="Please enter a valid email-id";
            }
        else if( result.length >= 1)
            {
                const hashedPassword=result[0].password;
               await bcrypt.compare(password,hashedPassword).then(
                   response=>{
                       if(response)
                       {
                        message="Valid User";  
                       }
                        else
                        { 
                            message="InValid password";  
                        }
                   }
               )
                          
            }      
        }
    ).catch((err)=>{
        message="An error occured";
    })       
    
    //console.log(message);       
      res.send(message);// error could be here
}

const addCollection=async({req,res})=>{
    const collName=req.body.collName;
   // console.log(req.body)
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
         {//console.log(doc);
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
   // console.log(imgurl);
  
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

const addNewImage=async ({req,res})=>{
    const collName=req.body.collName;
    const imgURL=req.body.imgURL;
    const imgName=req.body.imgName;

    const new_img={img_name:imgName,img_url:imgURL};
    const query= {$push:{'lists.$.list':new_img}};

    await SavedImagesModel.updateOne({_id:uid,'lists.listName':collName},
       query).then(
        ()=>{
            res.send("image added to new collection successfuly");
        }
    ).catch((err)=>{console.log(err)})

}

const deleteImage=async ({req,res})=>{
    const collName=req.body.collName;
    const imgURL=req.body.imgURL;
    const imgName=req.body.imgName;

    const img={img_name:imgName,img_url:imgURL};
    const query= {$pull:{'lists.$.list':img}};

    await SavedImagesModel.updateOne({_id:uid,'lists.listName':collName},
       query).then(
        ()=>{
            res.send("image removed from current collection successfuly");
        }
    ).catch((err)=>{console.log(err)})

}

const CollectionList=async ({collName,res})=>{
    await SavedImagesModel.findOne({_id:uid,'lists.listName':collName},"lists.$").then(
     (obj)=>{
         res.send(obj.lists[0]);
     }
    ).catch(err=>console.log(err))
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

// adding new image to collection
app.post("/addImage",async (req,res)=>{
     await addNewImage({req,res});
})

// remove image from collection
app.post("/removeImage",async (req,res)=>{
    await deleteImage({req,res});
})

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
});

// obtain collection imageslist
app.get("/collection-imageList/:collname",async (req,res)=>{
    const collName=req.params.collname;
    await CollectionList({collName,res});
});

app.get("/user-verification/:uid/:token",async (req,res)=>{
    const uid=req.params.uid;
    const tokenId=req.params.token;
    const user=await SignupModel.findOne({_id:uid});
    if(!user)
    {    
        res.send("Invalid Link");
    }
    else
    {
        const checkToken=await tokenModel.findOne({user_id:uid,token:tokenId});
        if(!checkToken)
        {   
            res.send("Invalid Link");
        }
        else
        {   user.status="active";
           await user.save();
           await tokenModel.deleteOne({_id:checkToken._id});
            res.send("You have successfully verified your account.\nYou can now close this page.")
        }
    }
})

app.listen(3004,()=>{
    console.log("Server running at 3004");
});